import { useState } from "react"
import { Camera as CameraIcon, CircleStop } from "lucide-react"
import Header from "../components/layout/Header"
import { getStreamUrl, stopCamera } from "../api/cameraApi"

function Camera() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState("")

  function startStream() {
    setError("")
    setIsStreaming(true)
  }

  async function stopStream() {
    try {
      await stopCamera()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header hostname="Server Camera" section="Your Hub" title="Camera" />
      <main className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium">Server camera</h2>
            <p className="mt-1 text-sm text-zinc-500">Live view from the camera connected to the server</p>
          </div>
          <button
            type="button"
            onClick={isStreaming ? stopStream : startStream}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm transition hover:border-zinc-500"
          >
            {isStreaming ? <CircleStop size={17} /> : <CameraIcon size={17} />}
            {isStreaming ? "Stop camera" : "Start camera"}
          </button>
        </div>

        <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-black">
          {isStreaming ? (
            <img
              src={getStreamUrl()}
              alt="Live server camera stream"
              className="h-full w-full object-contain"
              onError={() => {
                setIsStreaming(false)
                setError("Could not open the server camera. Check that a camera is connected and available.")
              }}
            />
          ) : (
            <div className="px-6 text-center text-sm text-zinc-500">
              <CameraIcon className="mx-auto mb-3 text-zinc-700" size={32} />
              Camera is stopped
            </div>
          )}
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
        <p className="mt-3 text-xs text-zinc-600">The camera is accessed by the backend machine. Keep this page open while viewing.</p>
      </main>
    </div>
  )
}

export default Camera
