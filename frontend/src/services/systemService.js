const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getSystemInfo() {
  const response = await fetch(`${API_BASE_URL}/system`)

  if (!response.ok) {
    throw new Error("Failed to fetch system information")
  }

  return response.json()
}