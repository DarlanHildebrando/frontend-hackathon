"use client"

import { Button } from "./ui/button"
import React from "react"

type Tema = "larica" | "trilha" | "praia"

export function ModalPontosTuristicosDiv({
    open,
    onOpenChange,
    tema
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    tema: Tema
}) {

    const temaCores: Record<Tema, string> = {
        larica: "border-purple-400",
        trilha: "border-green-400",
        praia: "border-yellow-400"
    }

    if (!open) return null // não renderiza se estiver fechado

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => onOpenChange(false)} // fecha ao clicar no fundo
        >
            {/* CONTAINER DA MODAL */}
            <div
                className={`
                    w-[900px]
                    h-[500px]
                    rounded-4xl
                    border-[6px]
                    bg-white
                    overflow-hidden
                    ${temaCores[tema]}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="border flex">
                    {/* LADO ESQUERDO */}
                    <div className="p-6 border w-1/2 space-y-4">
                        <h2 className="text-xl font-bold text-color-azul-900">Praia de Jurerê</h2>

                        <img
                            src="./elementos_temporarios/jurere.svg"
                            alt="Praia de Jurerê"
                            className="rounded-xl"
                        />

                        <p className="text-gray-700 text-sm leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s...
                        </p>

                        <Button variant="primary">
                            Ver no mapa
                        </Button>
                    </div>

                    {/* LADO DIREITO — CHAT */}
                    <div className="w-1/2 p-6">
                        pintooooooooooooooo
                    </div>
                </div>
            </div>
        </div>
    )
}
