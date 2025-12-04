"use client"
import { Volleyball, TreePalm, ChefHat } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { type LucideIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useScore } from "@/context/scoreContext";

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
    const journeys: Journey[] = [
        {
            id: 1,
            name: "Jornada tainha",
            address: [
                { name: "Praia do não sei da onde", check: false, category: "praia", id: 1 }
            ]
        },
        {
            id: 2,
            name: "Jornada gastronômica",
            address: [
                { name: "Mercado Público de Floripa", check: false, category: "praia", id: 2 },
                { name: "Trapiches da Beira-Mar", check: false, category: "praia", id: 3 },
                { name: "Restaurante da Ilha", check: false, category: "praia", id: 4 }
            ]
        },
        {
            id: 3,
            name: "Jornada histórica",
            address: [
                { name: "Ponte Hercílio Luz", check: false, category: "praia", id: 5 },
                { name: "Centro Histórico", check: false, category: "praia", id: 6 }
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
                                            <button className="cursor-pointer font-bold text-[16px] text-[#0F4A5C]">
                                                Ver mais
                                            </button>
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
