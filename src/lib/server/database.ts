import { Result } from "../result"
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

db.$connect()

export async function query<T>(
  fn: (db: Omit<PrismaClient, `$${string}`>) => T | PromiseLike<T>
): Promise<Result<Awaited<T>>> {
  try {
    return Result.ok(await fn(db))
  } catch (error) {
    return Result.error(error)
  }
}

export async function transaction<T>(
  fn: (db: Omit<PrismaClient, `$${string}`>) => T | PromiseLike<T>
): Promise<Result<Awaited<T>>> {
  return db.$transaction(async (db) => {
    try {
      return Result.ok(await fn(db))
    } catch (error) {
      return Result.error(error)
    }
  })
}
