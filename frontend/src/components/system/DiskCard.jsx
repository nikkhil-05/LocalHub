import { HardDrive } from "lucide-react"
import Card from "../common/Card"

function DiskCard({ disk }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            Storage
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {disk.usage_percent}%
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            {disk.used_gb} GB of {disk.total_gb} GB
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
          <HardDrive
            size={17}
            className="text-zinc-400"
            strokeWidth={1.7}
          />
        </div>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-zinc-400 transition-all duration-500"
          style={{ width: `${disk.usage_percent}%` }}
        />
      </div>
    </Card>
  )
}

export default DiskCard