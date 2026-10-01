export async function request(url, options = {}) {
  let response
  try {
    response = await fetch(url, options)
  } catch (error) {
    if (error.name === "AbortError") throw error
    throw new Error("Could not connect to the LocalHub server", { cause: error })
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const body = await response.json()
      message = body.detail || body.message || message
    } catch {
      // Keep the status-based message when the response has no JSON body.
    }
    throw new Error(message)
  }

  if (response.status === 204) return null
  const contentType = response.headers.get("content-type") || ""
  return contentType.includes("application/json") ? response.json() : response
}
