"use client"
import { Volleyball, TreePalm, ChefHat } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { type LucideIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useScore } from "@/context/scoreContext";
import { useState } from "react";
import { ModalPontosTuristicosDiv } from "./ModalPontosTuristicos";

type Category = "praia" | "trilha" | "larica";

interface Address {
    id: number;
    name: string;
    check: boolean;
    category: Category;
}

interface Journey {
    id: number;
    name: string;
    address: Address[];
}

export default function Journeys() {

    const [open, setOpen] = useState(false);

    const journeys: Journey[] = [
        {
            id: 1,
            name: "Jornada Tainha",
            address: [
                { id: 1, name: "Praia do Sombrio Azul", check: false, category: "praia" },
                { id: 2, name: "Trilha da Pedra Cantante", check: false, category: "trilha" },
                { id: 3, name: "Cantina da Dona Cema", check: false, category: "larica" },
                { id: 4, name: "Trilha do Morro Silencioso", check: false, category: "trilha" },
                { id: 5, name: "Praia do Refúgio Claro", check: false, category: "praia" },
            ]
        },
        {
            id: 2,
            name: "Jornada Gastronômica",
            address: [
                { id: 6, name: "Café do Sabiá Manhoso", check: false, category: "larica" },
                { id: 7, name: "Cantinho da Massa da Ilha", check: false, category: "larica" },
                { id: 8, name: "Lanchonete da Dona Gê", check: false, category: "larica" },
                { id: 9, name: "Praia das Ondas Mansinhas", check: false, category: "praia" },
                { id: 10, name: "Restinga do Pôr-Calmo", check: false, category: "praia" },
            ]
        },
        {
            id: 3,
            name: "Jornada Histórica",
            address: [
                { id: 11, name: "Estrada Velha do Miradouro", check: false, category: "trilha" },
                { id: 12, name: "Vila Antiga do Ribeirão Pequeno", check: false, category: "trilha" },
                { id: 13, name: "Empório do Seu Arlindo", check: false, category: "larica" },
                { id: 14, name: "Praia do Sargaço Doce", check: false, category: "praia" },
            ]
        }
    ]
    const iconsByCategory: Record<Category, LucideIcon> = {
        praia: Volleyball,
        trilha: TreePalm,
        larica: ChefHat
    }
    const colorsByCategory: Record<Category, string> = {
        praia: "#FFB900",
        trilha: "#00D492",
        larica: "#A684FF"
    }
    const { addScore, removeScore } = useScore()
    function handleCheckChange(checked: boolean) {
        if (checked) addScore(0.2)
        else removeScore(0.2)
    }
    return (
        <div className="bg-[#F8FAFA] border border-[#0F4A5C]/25 rounded-[12px] flex flex-col items-center p-6 gap-3">
            <h2 className="text-xl font-bold text-[#0F4A5C]">Suas jornadas com Tainho</h2>
            <div className="w-full">
                <Accordion type="single" collapsible className="w-full">
                    {journeys.map(journey => (
                        <AccordionItem key={journey.id} value={`item-${journey.id}`}>
                            <AccordionTrigger><p className="text-lg">{journey.name}</p></AccordionTrigger>
                            <AccordionContent className="flex flex-col text-balance pl-6">
                                {journey.address.map(add => {
                                    const Icon = iconsByCategory[add.category]
                                    const color = colorsByCategory[add.category]
                                    return (
                                        <div key={add.id}
                                            className="flex gap-3 border-b border-[#0F4A5C]/25 last:border-b-0 hover:border-[#BCD7DE]">
                                            <Label
                                                key={add.id}
                                                htmlFor={`item-${add.id}`}
                                                className="flex-1 cursor-pointer"
                                            >
                                                <div
                                                    className="flex items-center gap-4 transition-colors py-4 w-full"
                                                    style={{ color }}
                                                >
                                                    <Checkbox
                                                        id={`item-${add.id}`}
                                                        className="cursor-pointer"
                                                        onCheckedChange={(checked) => handleCheckChange(!!checked)}
                                                    />
                                                    <Icon className="size-6" />
                                                    <p className="text-[16px] font-bold">{add.name}</p>
                                                </div>
                                            </Label>
                                            <button
                                                onClick={() => setOpen(true)}
                                                className="cursor-pointer font-bold text-[16px] text-[#0F4A5C]"
                                            >
                                                ver mais
                                            </button>

                                            <ModalPontosTuristicosDiv open={open} onOpenChange={setOpen} tema="trilha" />
                                        </div>
                                    )
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
