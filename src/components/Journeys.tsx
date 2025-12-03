import { Volleyball, TreePalm, ChefHat } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
export default function Journeys() {
    const journeys = [
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
    ];

    return (
        <div className="bg-[#F8FAFA] border border-[#0F4A5C]/25 rounded-[12px] flex flex-col items-center p-6 gap-7">
            <h2 className="text-2xl font-bold text-[#0F4A5C]">Suas jornadas com Tainho</h2>
            <div className="w-full">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                >
                    {journeys.map(journey => (
                        <AccordionItem key={journey.id} value={`item-${journey.id}`}>
                            <AccordionTrigger>{journey.name}</AccordionTrigger>

                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                {journey.address.map(add => (
                                    <p key={add.id}>{add.name}</p>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
