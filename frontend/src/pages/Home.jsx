import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

import { getSystemInfo } from "../services/systemService"

import CpuCard from "../components/system/CpuCard"
import MemoryCard from "../components/system/MemoryCard"
import DiskCard from "../components/system/DiskCard"
import BatteryCard from "../components/system/BatteryCard"
import NetworkCard from "../components/system/NetworkCard"

import Header from "../components/layout/Header"
import HubCard from "../components/hub/HubCard"


function DashboardSection({ title, description, children }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <section className="mt-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between text-left"
      >
        <div>
          <h3 className="text-lg font-medium">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-600">
            {description}
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 transition group-hover:border-zinc-700">
          <ChevronDown
            size={17}
            className={`text-zinc-500 transition-transform duration-200 ${
              isOpen ? "rotate-0" : "-rotate-90"
            }`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "mt-5 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  )
}


function Home() {
  const [system, setSystem] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadSystemInfo() {
      try {
        const data = await getSystemInfo()

        setSystem(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Unable to fetch system information")
      }
    }

    loadSystemInfo()

    const interval = setInterval(loadSystemInfo, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])


  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        {error}
      </div>
    )
  }


  if (!system) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading LocalHub...
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      <Header hostname={system.hostname} />

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* System */}

        <DashboardSection
          title="System"
          description="Current machine status"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <CpuCard
              usage={system.cpu_usage_percent}
            />

            <MemoryCard
              memory={system.memory}
            />

            <DiskCard
              disk={system.disk}
            />

            <BatteryCard
              battery={system.battery}
            />

          </div>
        </DashboardSection>


        {/* Network */}

        <DashboardSection
          title="Network"
          description="Connected interfaces"
        >
          <NetworkCard
            network={system.network}
          />
        </DashboardSection>


        {/* Your Hub */}

<DashboardSection
  title="Your Hub"
  description="Your personal workspace"
>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

    <HubCard
      title="Files"
      description="Store and manage your files."
      icon="folder"
    />

  </div>
</DashboardSection>

      </main>

    </div>
  )
}

export default Home