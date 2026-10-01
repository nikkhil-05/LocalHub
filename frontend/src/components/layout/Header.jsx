import { Circle } from "lucide-react"

function Header({ hostname, section = "Overview", title = "Dashboard" }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 px-6 lg:px-8">

      <div>
        <p className="text-sm text-zinc-500">
          {section}
        </p>

        <h2 className="text-lg font-medium text-zinc-100">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3">

        <div className="hidden text-right sm:block">
          <p className="text-xs text-zinc-600">
            Host
          </p>

          <p className="text-sm text-zinc-400">
            {hostname}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5">
          <Circle
            size={7}
            fill="currentColor"
            className="text-emerald-400"
          />

          <span className="text-xs font-medium text-zinc-300">
            Online
          </span>
        </div>

      </div>

    </header>
  )
}

export default Header
