import { useEffect, useRef, useState } from "react"
import {
  File,
  Folder,
  FolderOpen,
  Trash2,
  Download,
  Upload,
  Plus,
  ChevronRight,
} from "lucide-react"
import { createFolder, deletePath, getDownloadUrl, listFiles, uploadFile } from "../api/filesApi"


function Files() {
  const [files, setFiles] = useState([])
  const [currentPath, setCurrentPath] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)

  const [showFolderInput, setShowFolderInput] = useState(false)
  const [folderName, setFolderName] = useState("")
  const [creatingFolder, setCreatingFolder] = useState(false)

  const fileInputRef = useRef(null)


  async function loadFiles(path = currentPath, signal) {
    setLoading(true)

    try {
      const data = await listFiles(path, { signal })
      setFiles(data)
      setError("")
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message)
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }


  useEffect(() => {
    const controller = new AbortController()
    loadFiles(currentPath, controller.signal)
    return () => controller.abort()
  }, [currentPath])


  function openFolder(folderName) {
    const newPath = currentPath
      ? `${currentPath}/${folderName}`
      : folderName

    setCurrentPath(newPath)
  }


  function navigateToBreadcrumb(index) {
    if (index === -1) {
      setCurrentPath("")
      return
    }

    const parts = currentPath.split("/")
    const newPath = parts.slice(0, index + 1).join("/")

    setCurrentPath(newPath)
  }


  function openFilePicker() {
    fileInputRef.current?.click()
  }


  async function handleUpload(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setUploading(true)

    try {
      await uploadFile(file, currentPath)
      await loadFiles(currentPath)

    } catch (error) {
      setError(error.message)
    } finally {
      setUploading(false)

      event.target.value = ""
    }
  }


  async function handleCreateFolder(event) {
    event.preventDefault()

    const name = folderName.trim()

    if (!name) {
      return
    }

    setCreatingFolder(true)

    try {
      await createFolder(name, currentPath)

      setFolderName("")
      setShowFolderInput(false)

      await loadFiles(currentPath)

    } catch (error) {
      setError(error.message)
    } finally {
      setCreatingFolder(false)
    }
  }


  async function handleDelete(item) {
    const itemPath = currentPath
      ? `${currentPath}/${item.name}`
      : item.name

    try {
      await deletePath(itemPath)
      await loadFiles(currentPath)

    } catch (error) {
      setError(error.message)
    }
  }


  function handleDownload(filename) {
    const filePath = currentPath
      ? `${currentPath}/${filename}`
      : filename

    window.open(getDownloadUrl(filePath), "_blank", "noopener,noreferrer")
  }


  function formatBytes(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`
    }

    if (bytes < 1024 ** 2) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    if (bytes < 1024 ** 3) {
      return `${(bytes / 1024 ** 2).toFixed(1)} MB`
    }

    return `${(bytes / 1024 ** 3).toFixed(2)} GB`
  }


  const breadcrumbs = currentPath
    ? currentPath.split("/")
    : []


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* Header */}

      <div className="border-b border-zinc-800 px-6 py-5 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <p className="text-sm text-zinc-500">
            Workspace
          </p>

          <h1 className="mt-1 text-xl font-medium">
            Files
          </h1>

          <p className="mt-1 text-sm text-zinc-600">
            Files stored on your machine.
          </p>

        </div>

      </div>


      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">

          {error && (
            <div role="alert" className="border-b border-red-900/70 bg-red-950/40 px-5 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Toolbar */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4">

            {/* Breadcrumbs */}

            <div className="flex min-w-0 items-center gap-1">

              <button
                onClick={() => navigateToBreadcrumb(-1)}
                className={`text-sm transition ${
                  currentPath
                    ? "text-zinc-500 hover:text-zinc-300"
                    : "text-zinc-200"
                }`}
              >
                Files
              </button>

              {breadcrumbs.map((part, index) => (
                <div
                  key={`${part}-${index}`}
                  className="flex min-w-0 items-center"
                >

                  <ChevronRight
                    size={15}
                    className="mx-1 shrink-0 text-zinc-700"
                  />

                  <button
                    onClick={() =>
                      navigateToBreadcrumb(index)
                    }
                    className={`max-w-40 truncate text-sm transition ${
                      index === breadcrumbs.length - 1
                        ? "text-zinc-200"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {part}
                  </button>

                </div>
              ))}

            </div>


            {/* Actions */}

            <div className="flex items-center gap-2">

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleUpload}
              />

              <button
                onClick={() =>
                  setShowFolderInput(!showFolderInput)
                }
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200"
              >
                <Plus size={15} />

                New folder
              </button>


              <button
                onClick={openFilePicker}
                disabled={uploading}
                className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Upload size={15} />

                {uploading
                  ? "Uploading..."
                  : "Upload file"}
              </button>

            </div>

          </div>


          {/* New folder form */}

          {showFolderInput && (
            <form
              onSubmit={handleCreateFolder}
              className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950/40 px-5 py-4"
            >

              <Folder
                size={17}
                className="text-zinc-500"
              />

              <input
                autoFocus
                value={folderName}
                onChange={(event) =>
                  setFolderName(event.target.value)
                }
                placeholder="Folder name"
                className="min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
              />

              <button
                type="submit"
                disabled={
                  creatingFolder ||
                  !folderName.trim()
                }
                className="rounded-lg bg-zinc-200 px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {creatingFolder
                  ? "Creating..."
                  : "Create"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowFolderInput(false)
                  setFolderName("")
                }}
                className="rounded-lg px-3 py-2 text-sm text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-300"
              >
                Cancel
              </button>

            </form>
          )}


          {/* Content */}

          {loading ? (

            <div className="px-5 py-16 text-center text-sm text-zinc-600">
              Loading...
            </div>

          ) : files.length === 0 ? (

            <div className="px-5 py-16 text-center">

              <FolderOpen
                size={28}
                className="mx-auto text-zinc-700"
                strokeWidth={1.5}
              />

              <p className="mt-4 text-sm text-zinc-500">
                This folder is empty.
              </p>

              <p className="mt-1 text-xs text-zinc-700">
                Upload a file or create a folder to get started.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-zinc-800">

              {files.map((item) => {

                const isDirectory =
                  item.type === "directory"

                return (
                  <div
                    key={item.name}
                    className="group flex items-center justify-between px-5 py-4 transition hover:bg-zinc-900"
                  >

                    {/* Item */}

                    <button
                      onClick={() =>
                        isDirectory
                          ? openFolder(item.name)
                          : undefined
                      }
                      className={`flex min-w-0 items-center gap-3 text-left ${
                        isDirectory
                          ? "cursor-pointer"
                          : "cursor-default"
                      }`}
                    >

                      {isDirectory ? (
                        <Folder
                          size={19}
                          className="shrink-0 text-zinc-500"
                          strokeWidth={1.7}
                        />
                      ) : (
                        <File
                          size={19}
                          className="shrink-0 text-zinc-500"
                          strokeWidth={1.7}
                        />
                      )}

                      <div className="min-w-0">

                        <p className="truncate text-sm text-zinc-300">
                          {item.name}
                        </p>

                        <p className="mt-0.5 text-xs text-zinc-600">
                          {isDirectory
                            ? "Folder"
                            : formatBytes(item.size)}
                        </p>

                      </div>

                    </button>


                    {/* Actions */}

                    <div className="ml-4 flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">

                      {!isDirectory && (
                        <button
                          onClick={() =>
                            handleDownload(item.name)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-300"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                      )}


                      <button
                        onClick={() =>
                          handleDelete(item)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-300"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>
                )
              })}

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default Files
