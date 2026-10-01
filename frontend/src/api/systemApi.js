import { API_URLS } from "./urls"
import { request } from "./request"

export function getSystemInfo({ signal } = {}) {
  return request(API_URLS.system(), { signal })
}
