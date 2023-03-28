import type { Prisma } from "@prisma/client"
import { Result } from "../result"
import { query } from "./database"
import { send } from "./mail"

export class Account {
  static create = Result.coroutineAsync(
    async (get, data: { email: string; name: string }) => {
      const verificationCode = crypto.randomUUID()

      const account = get(
        await query((db) =>
          db.account.create({
            data: {
              email: data.email,
              name: data.name,
              verified: false,
              verificationCode,
            },
          })
        )
      )

      get(
        await send({
          subject: "Verify your OneCity account",
          text: `Hi ${data.name}!

Thanks for signing up to OneCity! You're contributing to building a better world. To finish, verify your account with the link below.

https://1city.zsnout.com/verify/${verificationCode}

Thanks!

– The OneCity Team`,
          to: [{ address: data.email, name: data.name }],
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

  constructor(readonly filter: Prisma.AccountWhereUniqueInput) {}

  select<T extends Prisma.AccountSelect>(select: T) {
    return query((db) =>
      db.account.findUniqueOrThrow({
        select,
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
}