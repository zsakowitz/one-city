import type { Prisma } from "@prisma/client"
import { Result } from "../result"
import { query } from "./database"
import { hashPassword } from "./hash"
import { send } from "./mail"

export class Account {
  static create = Result.coroutineAsync(
    async (
      get,
      data: {
        email: string
        nameFirst: string
        nameLast: string
        password: string
      }
    ) => {
      const verificationCode = crypto.randomUUID()

      if (
        get(
          await query((db) =>
            db.account.count({
              where: { email: data.email },
            })
          )
        ) > 0
      ) {
        throw new Error(
          "Whoops! Looks like an account with your email already exists."
        )
      }

      const account = get(
        await query(async (db) =>
          db.account.create({
            data: {
              currentSession: crypto.randomUUID(),
              currentResetKey: crypto.randomUUID(),
              email: data.email,
              nameFirst: data.nameFirst,
              nameLast: data.nameLast,
              password: await hashPassword(data.password),
              resetKeyExpiration: new Date(),
              verified: false,
              verificationCode,
            },
          })
        )
      )

      get(
        await send({
          subject: "Verify your OneCity account",
          text: `Hi ${data.nameFirst}!

Thanks for signing up to OneCity! You're contributing to building a better world. To finish, verify your account with the link below.

https://1city.zsnout.com/verify/${verificationCode}

Thanks!

– The OneCity Team`,
          to: [
            { address: data.email, name: data.nameFirst + " " + data.nameLast },
          ],
        })
      )

      return account
    }
  )

  static async find(filter: Prisma.AccountWhereInput) {
    return (
      await query((db) =>
        db.account.findFirstOrThrow({
          select: { id: true },
          where: filter,
        })
      )
    ).map(({ id }) => new Account({ id }))
  }

  static verify = Result.coroutineAsync(async (get, code: string) => {
    const account = (await Account.find({ verificationCode: code })).unwrapOr(
      () => {
        throw new Error("You're already verified! Try logging in.")
      }
    )

    const { verified } = get(
      await account.select({
        verified: true,
      })
    )

    if (verified) {
      throw new Error("You're already verified! Try logging in.")
    }

    get(await account.update({ verified: true }))

    return account
  })

  constructor(readonly filter: Prisma.AccountWhereUniqueInput) {}

  select<T extends Prisma.AccountSelect>(
    select: T extends { name: boolean } ? never : T
  ) {
    return query((db) =>
      db.account.findUniqueOrThrow({
        select: select as T,
        where: this.filter,
      })
    )
  }

  update<T extends Prisma.AccountSelect | undefined = undefined>(
    data: Prisma.AccountUpdateInput,
    select?: T
  ) {
    return query((db) =>
      db.account.update({
        data,
        select: select as T | undefined,
        where: this.filter,
      })
    )
  }

  delete() {
    return query((db) => db.account.delete({ where: this.filter }))
  }
}
