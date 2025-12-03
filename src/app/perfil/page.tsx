import Sedbar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Check, Circle, MapPinCheck, Pen, Sailboat, UserRoundX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
    const lugares = [
        { nome: "Praia do não sei da onde", cor: "text-[#F4A420]" },
        { nome: "Trilha do Tarzan", cor: "text-[#2AC979]" },
        { nome: "Praia do não sei da onde", cor: "text-[#F4A420]" },
        { nome: "Trilha do Tarzan", cor: "text-[#2AC979]" },
        { nome: "Restaurante do seu nilton", cor: "text-[#B06CE3]" },
        { nome: "Trilha do Tarzan", cor: "text-[#2AC979]" },
        { nome: "Praia do não sei da onde", cor: "text-[#F4A420]" },
        { nome: "Trilha do Tarzan", cor: "text-[#2AC979]" },
        { nome: "Restaurante do seu nilton", cor: "text-[#B06CE3]" },
        { nome: "Trilha do Tarzan", cor: "text-[#2AC979]" },
    ];
    const jornadas = [
        { nome: "Passeio por todas as praias", cor: "text-[#F4A420]" },
        { nome: "Aventura na gastronomia do sambaqui", cor: "text-[#B06CE3]" },
        { nome: "Explorando a fauna e flora da ilha", cor: "text-[#2AC979]" },
    ];
    const user = {
        nome: 'João Silva',
        email: 'gogo@gmail.com',
        senha: '********',
        lugaresV: 15,
        jornadasC: 3
    }

    return (
        <div className="flex items-start w-full h-full bg-zinc-50 font-nunito">
            <div className="w-30">
                <Sedbar />
            </div>
            <div className="flex justify-end items-start gap-50 w-full p-5">

                <div className="w- flex flex-col justify-center gap-4 items-center mt-10">
                    <div className="flex gap-6 items-center">
                        <img src="/logoTainho.svg" className="w-50 h-50" />
                        <div className="font-nunito">
                            <h1 className="text-3xl font-bold">Informações Básicas</h1>
                            <div className="text-2xl flex flex-col gap-3 p-5 pr-50 border-2 border-azul-200 rounded-2xl">
                                <label className="flex gap-3 font-bold">Nome: <p className="text-azul-400">{user.nome}</p></label>
                                <label className="flex gap-3 font-bold">Email:<p className='text-azul-400'> {user.email}</p></label>
                                <label className="flex gap-3 font-bold">Senha:<p className='text-azul-400'> {user.senha}</p></label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 w-full">
                        <Link
                            href="/perfil"
                            className="flex items-center justify-center gap-4 w-full h-14 px-5 rounded-2xl bg-red-500 border text-white hover:border-red-500 hover:bg-transparent hover:text-red-500 transition-all"
                        >
                            <UserRoundX className="w-8   h-8" />

                            <span className="text-xl font-semibold">Excluir conta</span>
                        </Link>
                        <Link
                            href="/perfil"
                            className="flex items-center justify-center gap-4 w-full h-14 px-5 rounded-2xl text-[#13bfd7] border border-[#13BFD7] hover:bg-[#10aec5] hover:text-white transition-all"
                        >
                            <Pen className='w-8 h-8' />
                            <span className="text-xl font-semibold">Editar perfil</span>
                        </Link>

                    </div>
                </div>


                <div className="flex flex-col gap-4 w-[500px] ">
                    <div className=" flexflex-col">
                        <h2 className="text-3xl font-bold mb-4 ">Estatísticas</h2>
                        <div className="border-2 border-[#BCD7DE] rounded-2xl p-4">
                            <div className="p-4">

                                <h3 className="text-[#13BFD7] border-b text-2xl font-bold mb-5 flex mr-10 items-center gap-2">
                                    <MapPinCheck className='w-9 h-9' />
                                    {user.lugaresV} Lugares Visitados
                                </h3>

                                <div className="flex">

                                    <div className="flex flex-col items-center mr-4">
                                        {lugares.map((_, idx) => (
                                            <div key={idx} className="flex flex-col items-center">
                                                <div className="w-3 h-3 bg-[#13BFD7] rounded-full"></div>
                                                {idx !== lugares.length - 1 && (
                                                    <div className="w-px h-7 bg-[#13BFD7] opacity-50"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {lugares.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <span className={`font-semibold text-xl  ${item.cor}`}>
                                                    {item.nome}
                                                </span>
                                                <Check className="text-[#2AC979] w-6 h-6" />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-[#BCD7DE] rounded-2xl p-4">

                        <h3 className="text-[#13BFD7] border-b text-2xl font-bold mb-6 flex items-center gap-2">
                            <Sailboat className='w-10 h-10' />
                            {user.jornadasC} Jornadas Concluídas
                        </h3>

                        <div className="flex">

                            <div className="flex flex-col items-center mr-4">
                                {jornadas.map((_, idx) => (
                                    <div key={idx} className="flex flex-col items-center">
                                        <div className="w-3 h-3 bg-[#13BFD7] rounded-full"></div>
                                        {idx !== jornadas.length - 1 && (
                                            <div className="w-px h-10 bg-[#13BFD7] opacity-50"></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                {jornadas.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <span className={`font-semibold text-lg ${item.cor}`}>
                                            {item.nome}
                                        </span>
                                        <Check className="text-[#2AC979] w-6 h-6" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
