import { API_URLS } from "./urls"
import { request } from "./request"

export function getStreamUrl() {
  return API_URLS.camera.stream()
}

export function stopCamera() {
  return request(API_URLS.camera.stop(), { method: "DELETE" })
}
