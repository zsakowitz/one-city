import {
  ONE_CITY_MAIL_FROM,
  ONE_CITY_MAIL_HOST,
  ONE_CITY_MAIL_PASSWORD,
  ONE_CITY_MAIL_PORT,
  ONE_CITY_MAIL_USER,
} from "$env/static/private"
import { createTransport } from "nodemailer"
import type Mail from "nodemailer/lib/mailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { Result } from "../result"

if (
  !(
    ONE_CITY_MAIL_FROM &&
    ONE_CITY_MAIL_HOST &&
    ONE_CITY_MAIL_PASSWORD &&
    ONE_CITY_MAIL_PORT &&
    ONE_CITY_MAIL_USER
  )
) {
  throw new TypeError(
    "Mail system credentials are missing; the mailer cannot be created."
  )
}

const config: SMTPTransport.Options = {
  host: ONE_CITY_MAIL_HOST,
  port: +(ONE_CITY_MAIL_PORT || 587),
  secure: ONE_CITY_MAIL_PORT == "465",
  auth: {
    user: ONE_CITY_MAIL_USER,
    pass: ONE_CITY_MAIL_PASSWORD,
  },
}

const transport = createTransport(config)

/** A {@link Result} to return whenever email issues occur. */
export const issues = Result.error(
  "An issue occurred while connecting to the mail system."
)

/** Sends an email and returns a {@link Result} with the results. */
export async function send(
  options: Omit<Mail.Options, "from"> & {
    subject: unknown
    text: unknown
  } & ({ to: unknown } | { cc: unknown } | { bcc: unknown })
): Promise<Result<void>> {
  try {
    const info = await transport.sendMail({
      ...options,
      from: ONE_CITY_MAIL_FROM,
    })

    console.log(info)

    return Result.ok()
  } catch (err) {
    console.error(err)

    return issues
  }
}
