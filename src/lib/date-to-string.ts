export function dateToString(date: Date) {
  const now = new Date()

  if (
    date.getFullYear() == now.getFullYear() &&
    (date.getMonth() < now.getMonth() ||
      (date.getMonth() == now.getMonth() && date.getDate() <= now.getDate()))
  ) {
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
    })
  }

  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  })
}
