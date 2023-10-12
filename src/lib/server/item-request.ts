import { escapeHTML } from "$lib/escape-html"
import type { Result } from "$lib/result"
import type { Prisma } from "@prisma/client"
import { query } from "./database"

export interface ItemRequestJSON {
  id: string
  creation: number

  completed: number | null
  email: string | null
  description: string
  location: string
  name: string
  nameHTML: string
  requesterFirst: string
  requesterLast: string
  requester: string
  requesterHTML: string
  size: "sm" | "md" | "lg"
  tel: string | null
  urgency: 1 | 2 | 3
  url: string | null
}

export class ItemRequest {
  static async create(data: Prisma.ItemRequestCreateInput) {
    return (
      await query((db) => db.itemRequest.create({ data, select: { id: true } }))
    ).map(({ id }) => new ItemRequest({ id }))
  }

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

  delete() {
    return query((db) =>
      db.itemRequest.delete({
        where: this.filter,
      })
    )
  }

  async toJSON(): Promise<Result<ItemRequestJSON>> {
    const data = await this.select({
      creation: true,
      completed: true,
      email: true,
      description: true,
      id: true,
      location: true,
      name: true,
      requesterFirst: true,
      requesterLast: true,
      requester: true,
      size: true,
      tel: true,
      urgency: true,
      url: true,
    })

    return data.map((value) => ({
      ...value,
      creation: value.creation.getTime(),
      completed: value.completed?.getTime() ?? null,
      nameHTML: escapeHTML(value.name),
      requesterHTML: escapeHTML(
        value.requesterFirst + " " + value.requesterLast
      ),
      size: value.size == "Small" ? "sm" : value.size == "Large" ? "lg" : "md",
      urgency:
        value.urgency == "LowPriority"
          ? 3
          : value.urgency == "HighPriority"
          ? 1
          : 2,
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

  async toJSON(): Promise<Result<ItemRequestJSON[]>> {
    const data = await this.select({
      completed: true,
      email: true,
      creation: true,
      description: true,
      id: true,
      location: true,
      name: true,
      requesterFirst: true,
      requesterLast: true,
      size: true,
      tel: true,
      urgency: true,
      url: true,
    })

    return data.map((value) =>
      value.map((item) => ({
        ...item,
        creation: item.creation.getTime(),
        completed: item.completed?.getTime() ?? null,
        nameHTML: escapeHTML(item.name),
        requester: item.requesterFirst + " " + item.requesterLast,
        requesterHTML: escapeHTML(
          item.requesterFirst + " " + item.requesterLast
        ),
        size: item.size == "Small" ? "sm" : item.size == "Large" ? "lg" : "md",
        urgency:
          item.urgency == "LowPriority"
            ? 3
            : item.urgency == "HighPriority"
            ? 1
            : 2,
      }))
    )
  }
}
