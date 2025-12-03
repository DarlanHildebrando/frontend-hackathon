import Image from 'next/image'

export default function Tainhometro({ happines }: { happines: number }) {
    // largura útil da barra onde o ponteiro pode se mover
    const maxWidth = 680 // largura da barra - largura do ponteiro

    // calcula posição proporcional
    const pointerX = (happines / 10) * maxWidth
    return (
        <div className="bg-[#F8FAFA] border border-[#0F4A5C]/25 flex flex-col items-center gap-7 h-fit p-6 rounded-xl">
            <p className='text-2xl font-bold text-[#0F4A5C]'>Tainhômetro</p>
            <div className="flex flex-col gap-4 p-6 ">
                <div className="flex px-7 gap-14">
                    <Image alt="" src="/tainho/TainhoBravo.svg" height={80} width={80} />
                    <Image alt="" src="/tainho/TainhoTriste.svg" height={80} width={80} />
                    <Image alt="" src="/tainho/TainhoNeutro.svg" height={80} width={80} />
                    <Image alt="" src="/tainho/TainhioFeliz.svg" height={80} width={80} />
                    <Image alt="" src="/tainho/TainhoMuitoFeliz.svg" height={80} width={80} />
                </div>
                <div className="relative inline-block">
                    <Image alt="" src="/tainho/BarraTainhometroDegrade.svg" width={680} height={160} />
                    <div
                        className="absolute top-5 w-[22px]"
                        style={{ left: pointerX - 11 }}
                    >
                        <Image alt="" src="/tainho/Ponteiro.svg" width={22} height={23} />
                    </div>
                </div>
            </div>
        </div>
    )
}
