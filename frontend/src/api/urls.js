/**
 * Route registry. Keep browser routes and backend endpoint paths here so the
 * frontend's navigation and API surface can be reviewed in one place.
 * API usage: each endpoint is consumed by the matching module in ./.
 */
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000")
  .trim()
  .replace(/\/+$/, "")

export const APP_ROUTES = Object.freeze({
  home: "/",
  files: "/files",
  camera: "/camera",
})

const withQuery = (path, params = {}) => {
  const url = new URL(`${API_BASE_URL}${path}`)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value)
    }
  }
  return url.toString()
}

export const API_URLS = Object.freeze({
  health: () => withQuery("/health"), // healthApi.getHealth
  system: () => withQuery("/system"), // systemApi.getSystemInfo
  files: {
    list: (path = "") => withQuery("/files", { path }), // filesApi.listFiles
    upload: (path = "") => withQuery("/files/upload", { path }), // filesApi.uploadFile
    createFolder: (name, path = "") => withQuery("/files/folder", { name, path }), // filesApi.createFolder
    download: (path) => withQuery("/files/download", { path }), // filesApi.getDownloadUrl
    remove: (path) => withQuery("/files", { path }), // filesApi.deletePath
  },
  camera: {
    stream: () => withQuery("/camera/stream"), // cameraApi.getStreamUrl
    stop: () => withQuery("/camera/stream"), // cameraApi.stopCamera
  },
})
