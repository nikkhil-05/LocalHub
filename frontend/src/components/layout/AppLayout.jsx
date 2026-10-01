import { Outlet } from "react-router-dom"

import Sidebar from "./Sidebar"
import MobileNav from "./MobileNav"


function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      <MobileNav />

      <div className="flex min-h-[calc(100vh-57px)]">

        <Sidebar />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default AppLayout