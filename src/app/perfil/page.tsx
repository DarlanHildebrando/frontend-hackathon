"use client"

import Sidebar from '@/components/Sidebar'
import { userService } from '@/services/user/userService'
import { IUser } from '@/types/user'
import { Check, TriangleAlert, MapPinCheck, Pen, Sailboat, UserRoundX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function page() {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        console.log("data")
        async function loadProfile() {
            try {
                const userId = localStorage.getItem('id_cliente');
                if (userId) {
                    console.log("data")
                    const data = await userService.getProfile(userId);
                    setUser(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        loadProfile();
    }, []);

    // if (!user) return <p>Carregando...</p>;


    const lugares = [
        { nome: "Praia do não sei da onde", cor: "#F4A420" },
        { nome: "Trilha do Tarzan", cor: "#2AC979" },
        { nome: "Praia do não sei da onde", cor: "#F4A420" },
        { nome: "Trilha do Tarzan", cor: "#2AC979" },
        { nome: "Restaurante do seu nilton", cor: "#B06CE3" },
        { nome: "Trilha do Tarzan", cor: "#2AC979" },
        { nome: "Praia do não sei da onde", cor: "#F4A420" },
        { nome: "Trilha do Tarzan", cor: "#2AC979" },
        { nome: "Restaurante do seu nilton", cor: "#B06CE3" },
        { nome: "Trilha do Tarzan", cor: "#2AC979" },
    ];
    const jornadas = [
        { nome: "Passeio por todas as praias", cor: "#F4A420" },
        { nome: "Aventura na gastronomia do sambaqui", cor: "#B06CE3" },
        { nome: "Explorando a fauna e flora da ilha", cor: "#2AC979" },
    ];
    return (
        <div className="flex w-full h-full ">
            <Sidebar />
            <div className="flex w-full items-start justify-center gap-4 py-20 h-screen">
                <div className="flex flex-col justify-center gap-4 items-start">
                    <h1 className='text-xl font-bold'>Perfil</h1>
                    <div className="flex gap-4 items-center">
                        <Image src="/logoTainho.svg" alt='' height={180} width={180} />
                        <div className=" flex flex-col gap-3 font-bold p-6 bg-[#F8FAFA] border border-[#0F4A5C]/25 rounded-[12px] w-90">
                            <h2 className="text-xl text-[#0F4A5C]">Informações Básicas</h2>
                            <div className="flex flex-col gap-1 text-lg text-[#09090B]">
                                <label className="flex gap-3">Nome: <p>{user?.nome}</p></label>
                                <label className="flex gap-3">Email:<p> {user?.email}</p></label>
                                <label className="flex gap-3">Senha:<p> {user?.senha}</p></label>
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
    border border-[#23acbe] text-white bg-[#13BFD7]

    shadow-[0_2px_0_0_#23acbe]
    transition-all duration-200

    hover:translate-y-[2px]
    hover:shadow-[0_1px_0_0_#23acbe]
    active:translate-y-[4px]
    active:shadow-[0_0px_0_0_#23acbe]"
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
                            <div className="p-4">
                                <div className="border-b border-[#0F4A5C]/25 text-[#0F4A5C] flex items-center gap-2 pb-4">
                                    <MapPinCheck className='size-7' />
                                    <h2 className=" text-lg font-bold ">
                                        {user?.lugaresV} Lugares Visitados
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-3 py-3">
                                    {lugares.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between gap-3 w-full">
                                            <span
                                                className={`font-semibold text-[16px]`}
                                                style={{ color: item.cor }}>
                                                {item.nome}
                                            </span>
                                            <Check
                                                className=" size-6"
                                                style={{ color: item.cor }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F8FAFA] border border-[#0F4A5C]/25 rounded-[12px] p-4">
                            <div className="border-b border-[#0F4A5C]/25 text-[#0F4A5C] flex items-center gap-2 pb-4">
                                <Sailboat className='size-7' />
                                <h2 className=" text-lg font-bold ">
                                    {user?.jornadasC} Jornadas Concluídas
                                </h2>
                            </div>

                            <div className="flex flex-col gap-3 py-3">
                                {jornadas.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-3 w-full">
                                        <span
                                            className={`font-semibold text-[16px]`}
                                            style={{ color: item.cor }}>
                                            {item.nome}
                                        </span>
                                        <Check
                                            className=" size-6"
                                            style={{ color: item.cor }} />
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
