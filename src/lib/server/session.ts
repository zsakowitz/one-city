import type { Prisma } from "@prisma/client"
import { query } from "./database"

export class Session {
  static async create(data: Prisma.SessionCreateInput) {
    return (
      await query((db) => db.session.create({ data, select: { id: true } }))
    ).map(({ id }) => new Session({ id }))
  }

  static async find(filter: Prisma.SessionWhereInput) {
    return (
      await query((db) =>
        db.session.findFirstOrThrow({
          select: { id: true },
          where: filter,
        })
      )
    ).map(({ id }) => new Session({ id }))
  }

  constructor(readonly filter: Prisma.SessionWhereUniqueInput) {}

  select<T extends Prisma.SessionSelect>(select: T) {
    return query((db) =>
      db.session.findUniqueOrThrow({
        select,
        where: this.filter,
      })
    )
  }

  update<T extends Prisma.SessionSelect | undefined = undefined>(
    data: Prisma.SessionUpdateInput,
    select?: T
  ) {
    return query((db) =>
      db.session.update({
        data,
        select: select as T | undefined,
        where: this.filter,
      })
    )
  }
}

export class SessionList {
  constructor(readonly filter: Prisma.SessionWhereInput) {}

  select<T extends Prisma.SessionSelect>(select: T) {
    return query((db) =>
      db.session.findMany({
        select,
        where: this.filter,
      })
    )
  }
}
