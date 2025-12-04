"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { userService } from '@/services/user/userService';

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Limpa o erro quando o usuário começa a digitar
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validação básica no frontend
        if (!formData.name || !formData.email || !formData.password) {
            setError('Preencha todos os campos');
            setLoading(false);
            return;
        }

        if (formData.password.length < 7) {
            setError('A senha deve ter no mínimo 7 caracteres');
            setLoading(false);
            return;
        }

        try {
            const response = await userService.createUser(formData);
            console.log('Usuário criado:', response);
            
            // Redireciona para login após criar conta
            router.push('/login');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <img
                src="./elements/waves_background.svg"
                alt=""
                className='absolute bottom-0 left-0 w-full h-auto z-0'
            />

            {/* NAV BAR */}
            <div className='w-full px-50 py-6'>
                <div className='flex items-center justify-between'>
                    <img src="./logo/logo-rosto-tainho.svg" alt="Island Logo" className='w-35 h-12' />

                    {/*SELETOR DE IDIOMAS*/}
                    <div className='flex items-center'>
                        <div className='flex items-center gap-2 px-4 py-2'>
                            <p className='text-sm font-medium text-secondary opacity-70'>IDIOMA DO SITE: PORTUGUÊS</p>
                            <img src="./icons/chevron-down.svg" alt="Expandir" className='w-5 h-5' />
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <div className='flex relative z-10 py-10 px-55 justify-between'>
                <div className='p-12 flex flex-col items-center justify-center'>
                    <p className='text-2xl font-bold text-secondary text-center mb-13'>
                        Comece sua jornada criando uma conta
                        <br /> e desbloqueando novos destinos!
                    </p>

                    <img src="./tainho/tainho_acenando.svg" alt="" className='w-64 h-64 object-contain' />
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        <h2 className="text-3xl font-bold text-secondary text-center mb-2">
                            Crie sua conta
                        </h2>
                        <p className="text-sm text-center text-tertiary mb-3">
                            Seu passaporte para explorar, embarque nessa viagem!
                        </p>

                        {/* Mensagem de erro */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[12px] mb-4">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <div>
                                <label className="block text-tertiary font-semibold mb-1">
                                    Nome
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-background-input border-2 border-tertiary rounded-[12px] focus:outline-none focus:border-[0.5px] focus:border-tertiary/50 text-tertiary"
                                />
                            </div>

                            <div>
                                <label className="block text-tertiary font-semibold mb-1">
                                    E-mail
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-background-input border-2 border-tertiary rounded-[12px] focus:outline-none focus:border-[0.5px] focus:border-tertiary/50 text-tertiary"
                                />
                            </div>

                            <div>
                                <label className="block text-tertiary font-semibold mb-1">
                                    Senha
                                </label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="**********"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full px-4 py-1 bg-background-input border-2 border-tertiary rounded-[12px] focus:outline-none focus:border-[0.5px] focus:border-tertiary/50 text-tertiary"
                                />
                            </div>

                            <Button 
                                variant={'primary'}
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'CRIANDO...' : 'CRIAR NOVA CONTA'}
                            </Button>

                            <Button 
                                variant={'secondary'}
                                onClick={() => router.push("/login")}
                                disabled={loading}
                                className="w-full"
                            >
                                ENTRAR
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}