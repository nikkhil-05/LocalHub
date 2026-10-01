import {
  Folder,
  Camera,
  ArrowUpRight,
} from "lucide-react"

import { useNavigate } from "react-router-dom"
import { APP_ROUTES } from "../../api/urls"


function HubCard({ title, description, icon }) {
  const navigate = useNavigate()

  const icons = {
    folder: Folder,
    camera: Camera,
  }

  const Icon = icons[icon]


  function handleClick() {
    navigate(icon === "camera" ? APP_ROUTES.camera : APP_ROUTES.files)
  }


  return (
    <button
      onClick={handleClick}
      className="group flex w-full items-start justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-left transition duration-200 hover:border-zinc-700 hover:bg-zinc-900"
    >

      <div>

        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">

          <Icon
            size={18}
            strokeWidth={1.7}
            className="text-zinc-400"
          />

        </div>


        <h4 className="font-medium">
          {title}
        </h4>


        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {description}
        </p>

      </div>


      <ArrowUpRight
        size={17}
        className="text-zinc-700 transition group-hover:text-zinc-400"
      />

    </button>
  )
}

export default HubCard
