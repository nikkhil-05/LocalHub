import {
  Network,
  Wifi,
  Cable,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react"

function NetworkCard({ network }) {
  const interfaces = network.interfaces.filter(
    (item) => item.ipv4
  )

  const formatBytes = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`
    }

    if (bytes < 1024 ** 2) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    if (bytes < 1024 ** 3) {
      return `${(bytes / 1024 ** 2).toFixed(1)} MB`
    }

    if (bytes < 1024 ** 4) {
      return `${(bytes / 1024 ** 3).toFixed(2)} GB`
    }

    return `${(bytes / 1024 ** 4).toFixed(2)} TB`
  }

  const getInterfaceIcon = (name) => {
    const lowerName = name.toLowerCase()

    if (
      lowerName.includes("wi-fi") ||
      lowerName.includes("wifi") ||
      lowerName.includes("wireless")
    ) {
      return Wifi
    }

    return Cable
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
            <Network
              size={17}
              className="text-zinc-400"
              strokeWidth={1.7}
            />
          </div>

          <div>
            <p className="text-sm font-medium">
              Network interfaces
            </p>

            <p className="text-xs text-zinc-600">
              Local network connections
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-xs text-zinc-500">
            Active
          </span>

        </div>

      </div>


      {/* Interfaces */}
      <div className="divide-y divide-zinc-800">

        {interfaces.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-zinc-600">
            No active network interface found.
          </div>
        ) : (
          interfaces.map((item) => {

            const Icon = getInterfaceIcon(item.name)

            return (
              <div
                key={item.name}
                className="px-5 py-5"
              >

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <Icon
                      size={18}
                      className="text-zinc-400"
                      strokeWidth={1.7}
                    />

                    <div>

                      <p className="text-sm font-medium">
                        {item.name}
                      </p>

                      <p className="mt-0.5 text-xs text-zinc-600">
                        Network interface
                      </p>

                    </div>

                  </div>

                  <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] text-zinc-500">
                    IPv4
                  </span>

                </div>


                {/* Details */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-zinc-600">
                      IP Address
                    </p>

                    <p className="mt-1 font-mono text-sm text-zinc-300">
                      {item.ipv4}
                    </p>
                  </div>


                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-zinc-600">
                      Netmask
                    </p>

                    <p className="mt-1 font-mono text-sm text-zinc-300">
                      {item.netmask || "N/A"}
                    </p>
                  </div>


                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-zinc-600">
                      MAC Address
                    </p>

                    <p className="mt-1 font-mono text-sm text-zinc-300">
                      {item.mac || "N/A"}
                    </p>
                  </div>

                </div>

              </div>
            )
          })
        )}

      </div>


      {/* Traffic */}
      <div className="grid grid-cols-2 border-t border-zinc-800">

        <div className="flex items-center gap-3 border-r border-zinc-800 px-5 py-4">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
            <ArrowDownToLine
              size={16}
              className="text-zinc-500"
            />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider text-zinc-600">
              Received
            </p>

            <p className="mt-0.5 text-sm font-medium">
              {formatBytes(network.bytes_received)}
            </p>
          </div>

        </div>


        <div className="flex items-center gap-3 px-5 py-4">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
            <ArrowUpFromLine
              size={16}
              className="text-zinc-500"
            />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider text-zinc-600">
              Sent
            </p>

            <p className="mt-0.5 text-sm font-medium">
              {formatBytes(network.bytes_sent)}
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default NetworkCard