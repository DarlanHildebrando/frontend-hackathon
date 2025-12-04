'use client'
import { useScore } from "@/context/scoreContext";
import { useEffect, useState } from "react";

export default function TextBalloon() {
    const [fala, setFala] = useState<string>()
    const { score } = useScore()
    const falasTainho = [
        "Quero ir na Praia Mole hoje, parece que o dia tá perfeito pra isso!",
        "Tô com vontade de passear na Lagoa da Conceição, bora?",
        "Que tal uma caminhada na Beira-Mar? Tô precisando de vento na cara.",
        "Hoje tá com cara de Mercado Público… sinto cheiro de comida boa.",
        "Campeche tá me chamando! Quero ver aquele marzão bonito.",
        "Tô pensando em ir num restaurante na Lagoa. Vai comigo?",
        "Bora dar uma volta no centro histórico? Quero explorar as ruazinhas.",
        "Quero ver a Ponte Hercílio Luz hoje… ela sempre deixa o dia mais bonito.",
        "Senti vontade de fazer a trilha da Costa da Lagoa. Que acha?",
        "Preciso de uma caminhada na orla da Beira-Mar. Partiu?",
        "Joaquina hoje? Tô sentindo que o vento lá tá divertido.",
        "Quero fazer um piquenique na UFSC. Só falta você topar.",
        "Tô afim de visitar Santo Antônio de Lisboa. Acho esse lugar mágico.",
        "Barra da Lagoa parece um bom destino hoje. Quero ver o mar.",
        "Bora para o Ribeirão da Ilha? Atmosfera de paz garantida.",
        "Quero tentar a trilha do Morro da Lagoa. Prometo me esforçar!",
        "Hoje bateu vontade de relaxar na Praia do Matadeiro.",
        "Tô pensando em ir no Mirante do Morro das Pedras. Preciso daquela vista!",
        "Campeche combina com hoje. Quero passar um tempinho por lá.",
        "Que tal os Ingleses? Tô com vontade de explorar aquele lado da ilha."
    ]
    function randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    useEffect(() => {
        setFala(falasTainho[randomInt(0, falasTainho.length - 1)])
    }, [score])
    useEffect(() => {
        const interval = setInterval(() => {
            setFala(falasTainho[randomInt(0, falasTainho.length - 1)]);
        }, 10000); // troca a cada 2 segundos

        return () => clearInterval(interval); // evita vazamento de memória
    }, []);
    return (
        <>
            <div className="absolute bottom-[320px] left-1/2 -translate-x-1/2 letraPula">
                <div className="bg-white rounded-[12px] shadow-lg px-5 py-3 text-[14px] text-[#066C89] wrap-break-word font-semibold text-center max-w-[280px] relative">
                    {/* Texto dinâmico */}
                    {fala}
                    {/* Triangulinho do balão (AGORA EM CIMA) */}
                    <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-0 h-0 border-l-12 border-l-transparent border-r-12 border-r-transparent border-t-12 border-t-white"> </div>
                </div>
            </div>
        </>
    )
}
