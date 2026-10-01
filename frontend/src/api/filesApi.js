import { API_URLS } from "./urls"
import { request } from "./request"

export function listFiles(path = "", { signal } = {}) {
  return request(API_URLS.files.list(path), { signal })
}

export function uploadFile(file, path = "") {
  const formData = new FormData()
  formData.append("file", file)
  return request(API_URLS.files.upload(path), { method: "POST", body: formData })
}

export function createFolder(name, path = "") {
  return request(API_URLS.files.createFolder(name, path), { method: "POST" })
}

export function deletePath(path) {
  return request(API_URLS.files.remove(path), { method: "DELETE" })
}

export function getDownloadUrl(path) {
  return API_URLS.files.download(path)
}
