import { escapeHTML } from "$lib/escape-html"
import type { Result } from "$lib/result"
import type { Prisma } from "@prisma/client"
import { query } from "./database"

export interface ItemRequestJSON {
  id: string
  creation: Date

  description: string
  name: string
  nameHTML: string
  requestor: string
  requestorHTML: string
  size: "sm" | "md" | "lg"
  urgency: 1 | 2 | 3
}

export class ItemRequest {
  static async find(filter: Prisma.ItemRequestWhereInput) {
    return (
      await query((db) =>
        db.itemRequest.findFirstOrThrow({
          select: { id: true },
          where: filter,
        })
      )
    ).map(({ id }) => new ItemRequest({ id }))
  }

  constructor(readonly filter: Prisma.ItemRequestWhereUniqueInput) {}

  select<T extends Prisma.ItemRequestSelect>(select: T) {
    return query((db) =>
      db.itemRequest.findUniqueOrThrow({
        select,
        where: this.filter,
      })
    )
  }

  update<T extends Prisma.ItemRequestSelect | undefined = undefined>(
    data: Prisma.ItemRequestUpdateInput,
    select?: T
  ) {
    return query((db) =>
      db.itemRequest.update({
        data,
        select: select as T | undefined,
        where: this.filter,
      })
    )
  }

  async toJSON(): Promise<Result<ItemRequestJSON>> {
    const data = await this.select({
      id: true,
      creation: true,
      description: true,
      name: true,
      requested: true,
      requestor: true,
      size: true,
      urgency: true,
    })

    return data.map((value) => ({
      ...value,
      nameHTML: escapeHTML(value.name),
      requestorHTML: escapeHTML(value.requestor),
      size: value.size == "Small" ? "sm" : value.size == "Large" ? "lg" : "md",
      urgency:
        value.urgency == "NotUrgent" ? 3 : value.urgency == "Urgent" ? 1 : 2,
    }))
  }
}

export class ItemRequestList {
  constructor(readonly filter: Prisma.ItemRequestWhereInput) {}

  select<T extends Prisma.ItemRequestSelect>(select: T) {
    return query((db) =>
      db.itemRequest.findMany({
        select,
        where: this.filter,
      })
    )
  }
}
