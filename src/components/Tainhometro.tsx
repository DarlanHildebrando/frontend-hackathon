"use client"
import { useScore } from '@/context/scoreContext'
import Image from 'next/image'

export default function Tainhometro() {
    const { score } = useScore()
    const maxWidth = 680 // largura da barra - largura do ponteiro

    // calcula posição proporcional
    const pointerX = (score / 10) * maxWidth
    return (
        <div className="bg-[#F8FAFA] border border-[#0F4A5C]/25 flex flex-col items-center h-fit gap-3 p-6 rounded-[12px] w-180">
            <p className='text-xl font-bold text-[#0F4A5C]'>Tainhômetro</p>
            <div className="flex flex-col gap-3 p-2 ">
                <div className="flex px-10 gap-20">
                    <Image alt="" src="/tainho/TainhoBravo.svg" height={52} width={52} />
                    <Image alt="" src="/tainho/TainhoTriste.svg" height={52} width={52} />
                    <Image alt="" src="/tainho/TainhoNeutro.svg" height={52} width={52} />
                    <Image alt="" src="/tainho/TainhioFeliz.svg" height={52} width={52} />
                    <Image alt="" src="/tainho/TainhoMuitoFeliz.svg" height={52} width={52} />
                </div>
                <div className="relative inline-block">
                    <Image
                        alt=""
                        src="/tainho/BarraTainhometro.svg"
                        width={674}
                        height={0}
                    />
                    <div
                        className="absolute top-5 w-[22px] transition-all duration-700 ease-out"
                        style={{ left: pointerX - 11 }}
                    >
                        <Image alt="" src="/tainho/Ponteiro.svg" width={16} height={16} />
                    </div>
                </div>

            </div>
        </div>
    )
}
