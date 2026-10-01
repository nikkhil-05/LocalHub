import { MemoryStick } from "lucide-react"
import Card from "../common/Card"

function MemoryCard({ memory }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            Memory
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {memory.usage_percent}%
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            {memory.used_gb} GB of {memory.total_gb} GB
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
          <MemoryStick
            size={17}
            className="text-zinc-400"
            strokeWidth={1.7}
          />
        </div>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-zinc-400 transition-all duration-500"
          style={{ width: `${memory.usage_percent}%` }}
        />
      </div>
    </Card>
  )
}

export default MemoryCard