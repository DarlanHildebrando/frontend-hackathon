"use client"

import Sidebar from '@/components/Sidebar'
import { useScore } from '@/context/scoreContext'
import { userService } from '@/services/user/userService'
import { IUser } from '@/types/user'
import { Check, TriangleAlert, MapPinCheck, Pen, Sailboat, UserRoundX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Category = "praia" | "trilha" | "larica";

export default function page() {
    const [user, setUser] = useState<IUser>()
    const { score } = useScore()
    const colorsByCategory: Record<Category, string> = {
        praia: "#FFB900",
        trilha: "#00D492",
        larica: "#A684FF"
    }
    const lugares: { nome: string, category: Category }[] = [
        { nome: "Praia do Canto Escondido", category: "praia" },
        { nome: "Prainha da Restinga Clara", category: "praia" },
        { nome: "Praia das Conchas Miúdas", category: "praia" },
        { nome: "Trilha do Mirante Tortuoso", category: "trilha" },
        { nome: "Trilha da Mata Alta", category: "trilha" },
        { nome: "Trilha do Poço Frio", category: "trilha" },
        { nome: "Café da Dona Ritinha", category: "larica" },
        { nome: "Cantinho do Pescador Velho", category: "larica" },
        { nome: "Pastelaria do Morro", category: "larica" },
        { nome: "Trilha do Vale Nebuloso", category: "trilha" },
        { nome: "Praia da Água Mansa", category: "praia" },
        { nome: "Lanchonete do Seu Zeca", category: "larica" },
    ]
    const jornadas: { nome: string, category: Category }[] = [
        { nome: "Passeio por todas as praias", category: "praia" },
        { nome: "Aventura na gastronomia do sambaqui", category: "larica" },
        { nome: "Explorando a fauna e flora da ilha", category: "trilha" },
    ]
    const localUser: IUser = {
        id: 1,
        name: "João Pereira da Silva",
        email: "joao@gmail.com",
        password: "1234567",
        current_coins: 0,
        created_at: "2025-12-04T00:58:57.669Z",
        roads: jornadas,
        address: lugares
    }
    useEffect(() => {
        async function loadProfile() {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (user) {
                    setUser({ ...user, address: [] })
                    return
                }
                setUser(localUser)
            } catch (error) {
                console.error(error)
            }
        }

        loadProfile()
    }, [])
    function getTainhoImage(score: number) {
        switch (true) {
            case score <= 2:
                return "/tainho/TainhoBravo.svg";
            case score <= 4:
                return "/tainho/TainhoTriste.svg";
            case score <= 6:
                return "/tainho/TainhoNeutro.svg";
            case score <= 8:
                return "/tainho/TainhioFeliz.svg";
            case score <= 10:
                return "/tainho/TainhoMuitoFeliz.svg";
            default:
                return "/tainho/TainhoNeutro.svg";
        }
    }

    return (
        <div className="flex w-full h-full ">
            <Sidebar />
            <div className="flex w-full items-start justify-center gap-4 py-20 h-screen">
                <div className="flex flex-col justify-center gap-4 items-start">
                    <h1 className='text-xl font-bold'>Perfil</h1>
                    <div className="flex gap-4 items-center">
                        <Image src={getTainhoImage(score)} alt='' height={180} width={180} />
                        <div className=" flex flex-col gap-3 font-bold p-6 bg-[#F8FAFA] border border-[#0F4A5C]/25 rounded-[12px] w-90">
                            <h2 className="text-xl text-[#0F4A5C]">Informações Básicas</h2>
                            <div className="flex flex-col gap-1 text-lg text-[#09090B]">
                                <label className="flex gap-3">Nome: <p>{user?.name}</p></label>
                                <label className="flex gap-3">Email:<p> {user?.email}</p></label>
                                <label className="flex gap-3">Senha:<p className="tracking-[0.1em] font-bold select-none overflow-x-hidden">
                                    {user?.password.replace(/./g, "*")}
                                </p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <Link
                            href="/perfil"
                            className="
    flex items-center justify-center gap-4 w-full py-2 rounded-[8px]
    border border-[#FF6467] text-[#FF6467]

    shadow-[0_2px_0_0_#FF6467]
    transition-all duration-200

    hover:translate-y-[2px]
    hover:shadow-[0_1px_0_0_#FF6467]
    active:translate-y-[4px]
    active:shadow-[0_0px_0_0_#FF6467]
  "
                        >
                            <TriangleAlert className='size-6' />

                            Excluir conta
                        </Link>
                        <Link
                            href="/perfil"
                            className="flex items-center justify-center gap-4 w-full py-2 rounded-[8px]
    border border-[#239fb0] text-white bg-[#13BFD7]

    shadow-[0_2px_0_0_#239fb0]
    transition-all duration-200

    hover:translate-y-[2px]
    hover:shadow-[0_1px_0_0_#239fb0]
    active:translate-y-[4px]
    active:shadow-[0_0px_0_0_#239fb0]"
                        >
                            <Pen className='size-6' />
                            <span className="text-lg font-semibold">Editar perfil</span>
                        </Link>

                    </div>
                </div>
                <div className=" flex flex-col gap-4 h-full">
                    <h2 className="text-xl font-bold">Estatísticas</h2>
                    <div className="flex flex-col overflow-y-scroll h-full gap-4 ">
                        <div className="bg-[#F8FAFA] border border-[#0F4A5C]/25 rounded-[12px] p-4">
                            <div className="">
                                <div className="border-b border-[#0F4A5C]/25 text-[#0F4A5C] flex items-center gap-2 pb-4">
                                    <MapPinCheck className='size-7' />
                                    <h2 className=" text-lg font-bold ">
                                        {user?.address.length} Lugares Visitados
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-3 py-3">
                                    {user?.address.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between gap-3 w-full">
                                            <span
                                                className={`font-semibold text-[16px]`}
                                                style={{ color: colorsByCategory[item.category] }}>
                                                {item.nome}
                                            </span>
                                            <Check
                                                className=" size-6"
                                                style={{ color: colorsByCategory[item.category] }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F8FAFA] border border-[#0F4A5C]/25 rounded-[12px] p-4">
                            <div className="border-b border-[#0F4A5C]/25 text-[#0F4A5C] flex items-center gap-2 pb-4">
                                <Sailboat className='size-7' />
                                <h2 className=" text-lg font-bold ">
                                    {user?.roads.length} Jornadas Concluídas
                                </h2>
                            </div>

                            <div className="flex flex-col gap-3 py-3">
                                {user?.roads.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-3 w-full text-[#0F4A5C]">
                                        <span
                                            className={`font-semibold text-[16px]`}
                                        // style={{ color: colorsByCategory[item.category] }}
                                        >
                                            {item.nome}
                                        </span>
                                        <Check
                                            className=" size-6"
                                        // style={{ color: colorsByCategory[item.category] }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
