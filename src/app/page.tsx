import Journeys from "@/components/Journeys";
import Tainhometro from "@/components/Tainhometro";
import TainhoPortal from "@/components/TainhoPortal";
export default function Home() {
  return (
    <div className="flex min-h-screen dark:bg-black">
      <div className="bg-blue-200 w-80">
        pintoo
      </div>
      <div className="w-auto flex">
        <div className="">
          <TainhoPortal />
        </div>
        <div className="flex flex-col gap-10">
          <Tainhometro happines={5} />
          <Journeys />
        </div>
      </div>
    </div>
  )
}
