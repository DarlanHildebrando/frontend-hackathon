"use client"

import Sidebar from '@/components/Sidebar'
import { useScore } from '@/context/scoreContext'
import { authService } from '@/services/auth/authService'
import { Category, User } from '@/types/user'
import { Check, TriangleAlert, MapPinCheck, Pen, Sailboat, Save } from 'lucide-react'
import jwt from "jsonwebtoken";
import Image from 'next/image'
import Link from 'next/link'
import bcrypt from "bcrypt";
import { useEffect, useState } from 'react'



export default function page() {
    const [user, setUser] = useState<User | null>(null)
    const [edit, setEdit] = useState(false)
    const { score } = useScore()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const colorsByCategory: Record<Category, string> = {
        PRAIA: "#FFB900",
        TRILHA: "#00D492",
        LARICA: "#A684FF"
    }
    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                password: user.password
            })
        }
    }, [user])
    useEffect(() => {
        function loadProfile() {
            try {
                const token = JSON.parse(localStorage.getItem('token') || '{}');
                console.log(token)
                const response = authService.decodeToken(token)
                console.log(response)
                setUser(response)
            } catch (error) {
                console.error(error)
            }
        }
        loadProfile()
    }, [])

    useEffect(() => { console.log(user) }, [user])
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
    const addresses = user?.roads?.flatMap(road => road.address) ?? [];
    async function handleSave() {
        try {
            const token = localStorage.getItem("token")

            const body: any = {
                name: form.name,
                email: form.email
            }

            // Enviar senha apenas se o usuário digitou
            if (form.password.trim().length > 0) {
                body.password = form.password
            }

            const res = await fetch("/api/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            // Atualiza o contexto local
            setUser(prev => ({
                ...prev!,
                name: form.name,
                email: form.email,
                password: "" // nunca guardar senha no front idealmente
            }))

            setEdit(false)
            alert("Perfil atualizado com sucesso!")

        } catch (err: any) {
            console.error(err)
            alert("Erro ao atualizar perfil")
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
                        <div className=" flex flex-col gap-3 font-bold p-6 bg-[#F8FAFA] border border-[#0F4A5C]/25 rounded-[12px] w-110">
                            <h2 className="text-xl text-[#0F4A5C]">Informações Básicas</h2>
                            <div className="flex flex-col text-lg text-[#09090B] gap-4">
                                <div className="flex w-full items-center gap-3">
                                    <label className="w-30 flex">Nome:</label>
                                    <input
                                        value={edit ? form.name : (user?.name ?? "")}
                                        disabled={!edit}
                                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                        className={`${edit && "border border-[#0F4A5C]/25 rounded-[8px] px-2 py-1"}`}
                                    />
                                </div>
                                <div className="flex w-full items-center gap-3">
                                    <label className="w-30 flex">Email:</label>
                                    <input
                                        value={edit ? form.email : (user?.email ?? "")}
                                        disabled={!edit}
                                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                                        className={`${edit && "border border-[#0F4A5C]/25 rounded-[8px] px-2 py-1"}`}
                                    />
                                </div>
                                <div className={`flex ${edit && "flex-col"}w-full items-center gap-3`}>
                                    <label className={` flex text-nowrap ${edit ? "w-30" : "w-30"}`}>
                                        {edit ? "Nova senha:" : "Senha:"}
                                    </label>
                                    <input
                                        type={edit ? "text" : "password"}
                                        value={edit ? form.password : (user?.password ?? "")}
                                        disabled={!edit}
                                        onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                                        className={`${edit && "border border-[#0F4A5C]/25 rounded-[8px] px-2 py-1"}`}
                                    />
                                </div>
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
                        <button
                            onClick={!edit ? () => setEdit(prev => !prev) : handleSave}
                            className="flex items-center justify-center gap-4 w-full py-2 rounded-[8px] border border-[#239fb0] text-white bg-[#13BFD7] shadow-[0_2px_0_0_#239fb0] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_1px_0_0_#239fb0] active:translate-y-[4px] active:shadow-[0_0px_0_0_#239fb0]"
                        >
                            {edit ? <Save className='size-6' /> : <Pen className='size-6' />}
                            <span className="text-lg font-semibold">{!edit ? "Editar" : "Salvar"}</span>
                        </button>

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
                                        {addresses.length} Lugares Visitados
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-3 py-3">
                                    {addresses.map(item => (
                                        <div key={item.id} className="flex items-center justify-between gap-3 w-full">
                                            <span
                                                className={`font-semibold text-[16px]`}
                                                style={{ color: colorsByCategory[item.category] }}>
                                                {item.name}
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
                                {user?.roads.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between gap-3 w-full text-[#0F4A5C]">
                                        <span
                                            className={`font-semibold text-[16px]`}
                                        // style={{ color: colorsByCategory[item.category] }}
                                        >
                                            {item.name}
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
