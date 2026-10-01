import { API_URLS } from "./urls"
import { request } from "./request"

export function getHealth({ signal } = {}) {
  return request(API_URLS.health(), { signal })
}
