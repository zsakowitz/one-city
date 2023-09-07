import {
  ONE_CITY_MAIL_RECEIVER_ADDRESS,
  ONE_CITY_MAIL_RECEIVER_NAME,
} from "$env/static/private"
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

    const { description, email, name, tel } = extractFromFormData(data, [
      "description",
      "email",
      "name",
      "tel",
    ] as const)

    const imagesDatas = data.getAll("images").filter((x) => x)

    const images = imagesDatas.map((entry) => {
      if (entry instanceof Blob) {
        return entry
      }

      throw error(403, "Invalid image uploaded.")
    })

    const info = unwrapOr500(await request.select({ id: true, name: true }))

    send({
      to: {
        address: ONE_CITY_MAIL_RECEIVER_ADDRESS,
        name: ONE_CITY_MAIL_RECEIVER_NAME,
      },
      subject: name + " may have " + info.name,

      text: `${name} may have "${info.name}".

Item: ${info.name}
URL: https://1city.zsnout.com/request/${info.id}

Name: ${name}
Email: ${email}${tel ? "\nPhone Number: " + tel : ""}

Item Description:
${description}`,

      attachments: await Promise.all(
        images.map<Promise<Attachment>>(async (file) => ({
          content: Buffer.from(await file.arrayBuffer()),
          filename: file.name,
          contentType: file.type,
        }))
      ),
    })
  },
} satisfies Actions
