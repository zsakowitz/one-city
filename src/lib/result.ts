export type ResultJSON<T> =
  | { ok: true; value: T }
  | { ok: false; reason: string }

export class Result<T> {
  static #get<T>(result: Result<T>): T {
    if (result.ok) {
      return result.#value as T
    } else {
      throw result.#value as string
    }
  }

  static coroutineAsync<P extends any[], T>(
    fn: (get: <U>(result: Result<U>) => U, ...args: P) => T | PromiseLike<T>
  ): (...args: P) => Promise<Result<Awaited<T>>> {
    return async (...args: P) => {
      try {
        return Result.ok(await fn(Result.#get, ...args))
      } catch (error) {
        return Result.error(error)
      }
    }
  }

  static of<T>(result: ResultJSON<T>): Result<T> {
    if (result.ok) {
      return Result.ok(result.value)
    } else {
      return Result.error(result.reason)
    }
  }

  static ok<T>(): Result<undefined>
  static ok<T>(value: T): Result<T>
  static ok<T>(value?: T): Result<T> {
    return new Result(true, value!)
  }

  static error(reason: unknown): Result<never> {
    return new Result<never>(
      false,
      reason instanceof Error ? reason.message : String(reason)
    )
  }

  readonly #value: T | string

  private constructor(readonly ok: boolean, value: T | string) {
    this.ok = ok
    this.#value = value
  }

  get value(): T | undefined {
    return this.ok ? (this.#value as T) : undefined
  }

  get reason(): string | undefined {
    return this.ok ? undefined : (this.#value as string)
  }

  flatMap<U>(fn: (value: T) => Result<U>): Result<U> {
    if (this.ok) {
      return fn(this.#value as T)
    } else {
      return Result.error(this.#value as string)
    }
  }

  async asyncFlatMap<U>(
    fn: (value: T) => Result<U> | PromiseLike<Result<U>>
  ): Promise<Result<U>> {
    if (this.ok) {
      return fn(this.#value as T)
    } else {
      return Result.error(this.#value as string)
    }
  }

  map<U>(fn: (value: T) => U): Result<U> {
    if (this.ok) {
      return Result.ok(fn(this.#value as T))
    } else {
      return Result.error(this.#value as string)
    }
  }

  toJSON(): ResultJSON<T> {
    return this.ok
      ? { ok: true, value: this.#value as T }
      : { ok: false, reason: this.#value as string }
  }

  unwrapOr(fn: (reason: string) => T): T {
    return this.ok ? (this.#value as T) : fn(this.#value as string)
  }
}
