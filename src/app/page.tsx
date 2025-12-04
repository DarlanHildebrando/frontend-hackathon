import Journeys from "@/components/Journeys";
import Sidebar from "@/components/Sidebar";
import Tainhometro from "@/components/Tainhometro";
import TainhoPortal from "@/components/TainhoPortal";
export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full flex items-start justify-start gap-8 py-20 px-14">
        <TainhoPortal />  {/* NÃO cresce */}
        <div className="flex flex-col gap-8 justify-start flex-1 h-125 overflow-y-scroll">
          <Tainhometro />
          <Journeys />
        </div>
      </div>
    </div>

  )
}
