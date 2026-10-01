import {
  LayoutDashboard,
  Folder,
  Settings,
} from "lucide-react"

import { NavLink } from "react-router-dom"


const navigation = [
  {
    name: "Overview",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Files",
    path: "/files",
    icon: Folder,
  },
]


function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-zinc-800 bg-zinc-950 lg:flex lg:flex-col">

      {/* Logo */}

      <div className="flex h-20 items-center px-6">
        <div>

          <h1 className="text-lg font-semibold tracking-tight">
            LocalHub
          </h1>

          <p className="text-xs text-zinc-600">
            Private infrastructure
          </p>

        </div>
      </div>


      {/* Navigation */}

      <nav className="flex-1 px-3 py-4">

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
          Workspace
        </p>

        <div className="space-y-1">

          {navigation.map((item) => {

            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                  }`
                }
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                />

                {item.name}
              </NavLink>
            )

          })}

        </div>

      </nav>


      {/* Settings */}

      <div className="border-t border-zinc-800 p-3">

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-300">

          <Settings
            size={17}
            strokeWidth={1.8}
          />

          Settings

        </button>

      </div>

    </aside>
  )
}

export default Sidebar