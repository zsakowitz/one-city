import { requests } from "../../requests/requests.js"

export function load({ params: { id } }) {
  return { id, request: requests.find((request) => request.id == id) }
}
