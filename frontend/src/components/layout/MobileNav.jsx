import {
  LayoutDashboard,
  Folder,
  Camera,
} from "lucide-react"

import { NavLink } from "react-router-dom"
import { APP_ROUTES } from "../../api/urls"


const navigation = [
  {
    name: "Overview",
    path: APP_ROUTES.home,
    icon: LayoutDashboard,
  },
  {
    name: "Files",
    path: APP_ROUTES.files,
    icon: Folder,
  },
  {
    name: "Camera",
    path: APP_ROUTES.camera,
    icon: Camera,
  },
]


function MobileNav() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950 px-4 py-3 lg:hidden">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold tracking-tight">
            LocalHub
          </p>

          <p className="text-[10px] text-zinc-600">
            Private infrastructure
          </p>

        </div>


        <div className="flex items-center gap-1">

          {navigation.map((item) => {

            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
                    isActive
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                  }`
                }
              >

                <Icon
                  size={15}
                  strokeWidth={1.8}
                />

                {item.name}

              </NavLink>
            )

          })}

        </div>

      </div>

    </nav>
  )
}

export default MobileNav
