"use client"

import Image from "next/image";
import TextBalloon from "./TextBalloon";
import { useEffect, useState } from "react";

export default function TainhoPortal() {
    const [sprite, setSprite] = useState<string>("TainhoParado.svg");
    const tainhoSprites = [
        "TainhoDireita.svg",
        "TainhoMapa.svg",
        "TainhoOla2.svg",
        "TainhoParado2.svg",
        "TainhoParado.svg",
    ];
    function randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSprite(tainhoSprites[randomInt(0, tainhoSprites.length - 1)]);
        }, 10000); // troca a cada 2 segundos

        return () => clearInterval(interval); // evita vazamento de memória
    }, []);
    return (
        <div className="relative flex justify-start items-start shrink-0 h-[508px]">
            {/* Fundo */}
            <Image src="/tainho/FundoFloripa.svg" alt="" width={340} height={508} />

            {/* Balão de fala */}
            <TextBalloon />

            {/* Tainho */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                <Image src={`/tainho/${sprite}`} alt="" width={332} height={380} />
            </div>
        </div>
    );
}
