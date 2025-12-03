import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function page() {
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
                        O jeito grátis, divertido e eficaz de
                        <br /> explorar novos lugares!
                    </p>

                    <img src="./tainho/tainho-mapinha.svg" alt="" className='w-64 h-64 object-contain' />
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        <h2 className="text-3xl font-bold text-secondary text-center mb-2">
                            Entrar
                        </h2>
                        <p className="text-sm text-center text-tertiary mb-3">
                            Bem-vindo de volta, viajante! Vamos começar mais uma aventura?
                        </p>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-tertiary font-semibold mb-1">
                                    E-mail
                                </label>
                                <Input
                                    type="text"
                                    placeholder="E-mail"
                                    className="w-full px-4 py-3 bg-background-input border-2 border-tertiary rounded-[12px] focus:outline-none focus:border-[0.5px] focus:border-tertiary/50 text-tertiary"
                                />
                            </div>

                            <div>
                                <label className="block text-tertiary font-semibold mb-1">
                                    Senha
                                </label>
                                <Input
                                    type="password"
                                    placeholder="**********"
                                    className="w-full px-4 py-1 bg-background-input border-2 border-tertiary rounded-[12px] focus:outline-none focus:border-[0.5px] focus:border-tertiary/50 text-tertiary"
                                />
                            </div>

                            <div className="text-right">
                                <button className="text-tertiary font-medium hover:underline text-sm">
                                    Esqueceu a sua senha?
                                </button>
                            </div>

                            <Button variant={'primary'}>
                                ENTRAR
                            </Button>

                            <Button variant={'secondary'}>
                                CRIAR NOVA CONTA
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
