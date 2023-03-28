import type { Prisma } from "@prisma/client"
import { Account } from "./account"
import { query } from "./database"

export class Passkey {
  static async find(filter: Prisma.PasskeyWhereInput) {
    return (
      await query((db) =>
        db.passkey.findFirstOrThrow({
          select: { id: true },
          where: filter,
        })
      )
    ).map(({ id }) => new Passkey({ id }))
  }

  constructor(readonly filter: Prisma.PasskeyWhereUniqueInput) {}

  async account() {
    const result = await this.select({ accountId: true })
    return result.map(({ accountId: id }) => new Account({ id }))
  }

  select<T extends Prisma.PasskeySelect>(select: T) {
    return query((db) =>
      db.passkey.findUniqueOrThrow({
        select,
        where: this.filter,
      })
    )
  }

  update<T extends Prisma.PasskeySelect | undefined = undefined>(
    data: Prisma.PasskeyUpdateInput,
    select?: T
  ) {
    return query((db) =>
      db.passkey.update({
        data,
        select: select as T | undefined,
        where: this.filter,
      })
    )
  }
}

export class PasskeyList {
  constructor(readonly filter: Prisma.PasskeyWhereInput) {}

  select<T extends Prisma.PasskeySelect>(select: T) {
    return query((db) =>
      db.passkey.findMany({
        select,
        where: this.filter,
      })
    )
  }
}
