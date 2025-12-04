"use client"

import Image from "next/image"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { useScore } from "@/context/scoreContext"

export default function Sidebar() {
  const pathname = usePathname()
  const {score} = useScore()
  const imgPerfil = `/nossoLucide/${pathname === "/perfil" ? "userB" : "userA"}.svg`

  return (
    <aside className="h-screen w-[400px] flex flex-col items-center border-r-2 gap-11 border-[#0F4A5C]/25 bg-white py-6">
      <Image src="./logo/Island.svg" alt="" width={4 * 30} height={28} />
      <nav className="flex flex-col gap-3 w-full px-6">
        <Link
          href="/perfil"
          className={`flex items-center gap-4 w-full p-2 rounded-[12px] ${pathname === "/perfil" ? "bg-[#13BFD7] text-white hover:bg-[#10aec5]" : "text-[#13BFD7]"} transition-all`}
        >
          <Image
            src={imgPerfil}
            width={28}
            height={28}
            alt="Perfil"
          />
          <span className="text-xl font-semibold">Perfil</span>
        </Link>

        <Link
          href="/"
          className={`flex items-center gap-4 w-full p-2 rounded-[12px] transition-all ${pathname === "/" ? "bg-[#13BFD7] text-white hover:bg-[#10aec5]" : "text-[#13BFD7] hover:bg-[#E6F9FC]"}`}
        >
          <Image
            src="/logoTainho.svg"
            width={28}
            className={`${pathname === "/" && "border-white border rounded-[4px]"}`}
            height={28}
            alt="Tainho"
          />
          <span className="text-lg font-semibold">
            Tainho
          </span>
        </Link>
      </nav>

      <div className="flex-1" />

      <div className="w-full px-6 mb-6">
        <Link
          href="/login"
          className="flex items-center gap-3 justify-center w-full rounded-[12px]"
          onClick={() => localStorage.clear}
        >
          <LogOut className="size-7 text-[#13BFD7]" />
          <span className="text-lg font-semibold text-[#13BFD7]">
            Sair da conta
          </span>
        </Link>
      </div>
    </aside>
  )
}
