import {
  ONE_CITY_MAIL_RECEIVER_ADDRESS,
  ONE_CITY_MAIL_RECEIVER_NAME,
} from "$env/static/private"
import { escape, RawHtml } from "$lib/escape.js"
import { Account } from "$lib/server/account.js"
import { query } from "$lib/server/database.js"
import { extractFromFormData } from "$lib/server/extract.js"
import { ItemRequest } from "$lib/server/item-request.js"
import { send } from "$lib/server/mail.js"
import { unwrapOr500 } from "$lib/server/unwrap.js"
import { error } from "@sveltejs/kit"
import type { Attachment } from "nodemailer/lib/mailer/index.js"
import type { Actions, PageServerLoad } from "./$types.js"

export async function load({
  locals,
  params: { id },
}: Parameters<PageServerLoad>[0]) {
  let admin = false

  if (
    locals.account &&
    unwrapOr500(await locals.account.select({ admin: true })).admin
  ) {
    admin = true
  }

  const json = unwrapOr500(await new ItemRequest({ id }).toJSON())

  return {
    admin,
    id,
    request: admin
      ? json
      : { ...json, requester: "", contact: "", location: "" },
  }
}

export const actions = {
  async complete({ locals, params: { id } }) {
    if (!locals.account) {
      throw error(403, "You need to be logged in to access this page.")
    }

    if (!unwrapOr500(await locals.account.select({ admin: true })).admin) {
      throw error(403, "You don't have permission to access this page.")
    }

    const request = new ItemRequest({ id })

    unwrapOr500(await request.update({ completed: new Date() }))

    return {
      admin: true,
      id,
      json: unwrapOr500(await request.toJSON()),
    }
  },

  async uncomplete({ locals, params: { id } }) {
    if (!locals.account) {
      throw error(403, "You need to be logged in to access this page.")
    }

    if (!unwrapOr500(await locals.account.select({ admin: true })).admin) {
      throw error(403, "You don't have permission to access this page.")
    }

    const request = new ItemRequest({ id })

    unwrapOr500(await request.update({ completed: null }))

    return {
      admin: true,
      id,
      json: unwrapOr500(await request.toJSON()),
    }
  },

  async email({ params: { id }, request: req }) {
    const request = new ItemRequest({ id })

    const data = await req.formData()

    const {
      description,
      email,
      nameFirst,
      nameLast,
      tel,
      pickup_address: pickupAddress,
      pickup_city: pickupCity,
      best_time: bestTime,
      contact_email: contactEmail,
      contact_call: contactCall,
      contact_text: contactText,
      transport_self: transportBySelf,
      transport_hire: transportByHire,
    } = extractFromFormData(
      data,
      [
        "description",
        "email",
        "nameFirst",
        "nameLast",
        "tel",
        "pickup_address",
        "pickup_city",
        "best_time",
      ] as const,
      [
        "contact_email",
        "contact_call",
        "contact_text",
        "transport_self",
        "transport_hire",
      ] as const
    )

    const imagesDatas = data.getAll("images").filter((x) => x)

    const images = imagesDatas.map((entry) => {
      if (entry instanceof Blob) {
        return entry
      }

      throw error(403, "Invalid image uploaded.")
    })

    const info = unwrapOr500(
      await request.select({ id: true, name: true, uid: true })
    )

    const emails = unwrapOr500(
      await query((db) =>
        db.account.findMany({
          select: { email: true, nameFirst: true, nameLast: true },
          where: { admin: true, adminMail: true },
        })
      )
    )

    // prettier-ignore
    const prefers =
      contactEmail
        ? contactCall
          ? contactText ? "any method of contact" : "an email or phone call"
          : contactText ? "an email or text message" : "an email"
        : contactCall
          ? contactText ? "a phone call or text message" : "a phone call"
          : contactText ? "a text message" : "unspecified method of contact"

    // prettier-ignore
    const transport =
      transportBySelf
        ? transportByHire ? "can drive or hire a worker" : "can drive item"
        : transportByHire ? "can hire a worker" : "does not want to drive or hire a worker"

    const result = await send({
      to:
        emails.length == 0
          ? {
              address: ONE_CITY_MAIL_RECEIVER_ADDRESS,
              name: ONE_CITY_MAIL_RECEIVER_NAME,
            }
          : emails.map(({ email, nameFirst, nameLast }) => ({
              address: email,
              name: `${nameFirst} ${nameLast}`,
            })),
      subject: `OneCity: #${info.uid} – ${info.name}`,

      text: `${nameFirst} ${nameLast} may have "${info.name}".

ID: ${info.uid}
Item: ${info.name}

Name: ${nameFirst} ${nameLast}
Email: ${email}${tel ? "\nPhone Number: " + tel : ""}
URL: https://1city.zsnout.com/request/${info.id}

Item Description:
${description}`,

      html: escape`${nameFirst} ${nameLast} may have "${info.name}".

<b>ID:</b> ${info.uid}
<b>Item:</b> ${info.name}
<b>URL:</b> https://1city.zsnout.com/request/${info.id}

<b>Name:</b> ${nameFirst} ${nameLast}
<b>Email:</b> ${email}
<b>Phone Number:</b> ${tel ? tel : "not shared"}
<b>Prefers:</b> ${prefers}
<b>Contact At:</b> ${bestTime.replace(/^(\d\d):(\d\d)$/, (_, hour, minute) => {
        if (+hour <= 12) {
          return hour + ":" + minute + "am"
        } else {
          return +hour - 12 + ":" + minute + "pm"
        }
      })}
<b>Pick Up Item At:</b> ${pickupAddress}, ${pickupCity}
<b>Transport Options:</b> ${transport}

<b>Item Description:</b>
${description}${
        emails.length == 0
          ? new RawHtml(
              "\n\n<em>This fallback address is receiving mail because no admin is marked to receive emails.</em>"
            )
          : ""
      }`.replaceAll("\n", "<br/>"),

      attachments: await Promise.all(
        images
          .filter((file) => file.size > 0)
          .map<Promise<Attachment>>(async (file) => ({
            content: Buffer.from(await file.arrayBuffer()),
            filename: file.name,
            contentType: file.type,
          }))
      ),
    })

    unwrapOr500(result)
  },
} satisfies Actions
