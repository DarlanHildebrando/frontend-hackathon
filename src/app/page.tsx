import Journeys from "@/components/Journeys";
import Sidebar from "@/components/Sidebar";
import Tainhometro from "@/components/Tainhometro";
import TainhoPortal from "@/components/TainhoPortal";
export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full flex items-center justify-center gap-14 p-14">
        <TainhoPortal />  {/* NÃO cresce */}
        <div className="flex flex-col gap-8 justify-start flex-1 ">
          <Tainhometro />
          <Journeys />
        </div>
      </div>
    </div>

  )
}
