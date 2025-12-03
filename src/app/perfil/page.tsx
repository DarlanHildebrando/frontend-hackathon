import Sedbar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
    const user = {
        nome: 'João Silva',
        email: 'gogo@gmail.com',
        senha: '********'
    }
    return (
        <div className="flex items-start justify-center w-screen h-screen bg-zinc-50 font-nunito">
            <div className="w-30">
            <Sedbar />
            </div>
            <div className="w-screen flex flex-col items-center mt-10">
                <img src="nossaLucide/userB.svg" className="w-30 h-30" />
                <div className="border-2 border-black rounded-lg p-5 m-5">
                    <h1 className="">Informações Básicas</h1>
                    <div className="text-2xl">
                        <label className="flex gap-2">Nome: <p className="text-azul-500">{user.nome}</p></label>
                        <label className="flex gap-2">Email:<p className='text-azul-500'> {user.email}</p></label>
                        <label className="flex gap-2">Senha:<p className='text-azul-500'> {user.senha}</p></label>
                    </div>
                </div>
                <div className="flex">
                <Button className="bg-blue-400 text-white rounded-lg p-3 m-5">
                  Excluir Conta
                </Button>
                <Button className="bg-blue-400 text-white rounded-lg p-3 m-5">
                    Salvar Alterações
                </Button>
                
                </div>
            </div>
        </div>
    )
}
