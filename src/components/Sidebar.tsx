"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="h-screen w-100 flex flex-col items-center border-r-2 gap-8 border-[#BCD7DE] bg-white py-10">
      <Image src="./logo/Island.svg" alt="" width={144} height={28}/>
      <nav className="flex flex-col gap-6 w-full px-6">
        <Link
          href="/perfil"
          className="flex items-center gap-4 w-full h-14 px-4 rounded-2xl bg-[#13BFD7] text-white hover:bg-[#10aec5] transition-all"
        >
          <Image
            src="/nossoLucide/userB.svg"
            width={36}
            height={36}
            alt="Perfil"
          />
          <span className="text-2xl font-semibold">Perfil</span>
        </Link>

        <Link
          href="/tainho"
          className="flex items-center gap-4 w-full h-14 px-4 rounded-2xl hover:bg-[#E6F9FC] transition-all"
        >
          <Image
            src="/logoTainho.svg"
            width={32}
            height={32}
            alt="Tainho"
          />
          <span className="text-2xl text-[#13BFD7] font-semibold">
            Tainho
          </span>
        </Link>
      </nav>

      <div className="flex-1" />

      <div className="w-full px-6 mb-6">
        <Link
          href="/"
          className="flex items-center gap-3 justify-center w-full h-14 rounded-2xl border-2 border-[#13BFD7] hover:bg-[#E6F9FC] transition-all"
        >
          <LogOut className="w-7 h-7 text-[#13BFD7]" />
          <span className="text-2xl font-semibold text-[#13BFD7]">
            Sair da conta
          </span>
        </Link>
      </div>
    </aside>
  );
}
