"use client"

import React, { useState, useRef, useEffect } from "react"

type Tema = "larica" | "trilha" | "praia"

type Message = {
    id: string
    text: string
    sender: "user" | "bot"
    timestamp: Date
}

export function ModalPontosTuristicosDiv({
    open,
    onOpenChange,
    tema
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    tema: Tema
}) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Oi! Eu sou o Tainho! 🌊 Clique em uma das opções abaixo para saber mais sobre este lugar incrível!",
            sender: "bot",
            timestamp: new Date()
        }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [descricao, setDescricao] = useState("Carregando descrição...")
    const [isLoadingDescricao, setIsLoadingDescricao] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const temaCores: Record<Tema, string> = {
        larica: "border-purple-400",
        trilha: "border-green-400",
        praia: "border-yellow-400"
    }

    const temaConfig = {
        larica: {
            primary: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
            bubble: "bg-purple-100",
            button: "bg-purple-400 border border-purple-600",
            shadowColor: "#7C3AED" // purple-600
        },
        trilha: {
            primary: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
            bubble: "bg-green-100",
            button: "bg-green-400 border border-green-600",
            shadowColor: "#16A34A" // green-600
        },
        praia: {
            primary: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
            bubble: "bg-yellow-100",
            button: "bg-yellow-400 border border-yellow-600",
            shadowColor: "#CA8A04" // yellow-600
        },
    }

    const temaOutline = {
        larica: {
            border: "border-purple-600",
            text: "text-purple-600",
            shadowColor: "#7C3AED"
        },
        trilha: {
            border: "border-green-600",
            text: "text-green-600",
            shadowColor: "#16A34A"
        },
        praia: {
            border: "border-yellow-600",
            text: "text-yellow-600",
            shadowColor: "#CA8A04"
        },
    }


    // Prompts pré-definidos que o usuário pode escolher
    const promptOptions = [
        { id: "historia", label: "História do lugar", prompt: "Seja muito alegre e feliz enquanto responde!!! Conte a história deste lugar em 3 linhas, você é uma mascote (vc se chama tainho) de um site se comunicando com os espectadores (não use texto diferente na frase, ex: fonte em negrito)" },
        { id: "curiosidades", label: "Curiosidades", prompt: "Seja muito alegre enquanto responde!!! Quais são as curiosidades sobre este lugar? me conte em no maximo 3 linhas, você é uma mascote (vc se chama tainho) de um site se comunicando com os espectadores (não use texto diferente na frase, ex: fonte em negrito)" },
        { id: "dicas", label: "Dicas de visita", prompt: "Dê dicas para visitar este lugar, seja simpatico em quanto fala e responda muito resumidamente, você é uma mascote (vc se chama tainho) de um site se comunicando com os espectadores (não use texto diferente na frase, ex: fonte em negrito)" },
        { id: "como-chegar", label: "Como chegar", prompt: "Como chegar neste lugar? Se for possivel manda o endereço do local e seja muito breve na resposta, você é uma mascote (vc se chama tainho) de um site se comunicando com os espectadores (não use texto diferente na frase, ex: fonte em negrito)" }
    ]

    // Auto-scroll para última mensagem
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Buscar descrição do local quando abrir a modal
    useEffect(() => {
        if (open) {
            fetchDescricao()
        }
    }, [open])

    // buscar descrição do local
    const fetchDescricao = async () => {
        setIsLoadingDescricao(true)
        try {
            const response = await fetch("http://localhost:8080/gemini/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: "Faça uma descrição curta e objetiva sobre a Praia de Jurerê em Florianópolis. Máximo 3 linhas. Seja informativo e acolhedor."
                })
            })

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const data = await response.json()
            setDescricao(data.data || "Descrição não disponível no momento.")
        } catch (error) {
            console.error("Erro ao buscar descrição:", error)
            setDescricao("Uma bela praia localizada em Florianópolis, conhecida por suas águas calmas e infraestrutura completa.")
        } finally {
            setIsLoadingDescricao(false)
        }
    }

    // enviar prompt ao backend
    const handlePromptClick = async (prompt: string, label: string) => {
        // Adiciona mensagem do usuário
        const userMessage: Message = {
            id: Date.now().toString(),
            text: label,
            sender: "user",
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setIsLoading(true)

        try {
            console.log("🚀 Enviando requisição para o backend...")

            const response = await fetch("http://localhost:8080/gemini/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: `${prompt} sobre a Praia de Jurerê em Florianópolis`
                })
            })

            console.log("📡 Status da resposta:", response.status)

            if (!response.ok) {
                const errorText = await response.text()
                console.error("❌ Erro do servidor:", errorText)
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const data = await response.json()
            console.log("✅ Resposta recebida:", data)

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.data || "Desculpe, não consegui gerar uma resposta.",
                sender: "bot",
                timestamp: new Date()
            }

            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error("Erro ao buscar resposta:", error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Ops! Tive um problema ao buscar essa informação. Tente novamente!",
                sender: "bot",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    // abrir Google Maps
    const handleVerNoMapa = () => {
        const localNome = "Praia de Jurerê, Florianópolis"
        const encodedLocal = encodeURIComponent(localNome)
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocal}`
        window.open(mapsUrl, '_blank')
    }

    if (!open) return null

    return (
        <>
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>

            <div
                className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
                onClick={() => onOpenChange(false)}
            >
                <div
                    className={`
                        w-[900px]
                        h-[500px]
                        rounded-3xl
                        border-[6px]
                        bg-white
                        overflow-hidden
                        ${temaCores[tema]}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex h-full">
                        {/* LADO ESQUERDO */}
                        <div className="p-6 py-12 w-1/2 space-y-4 flex flex-col">
                            <h2 className="text-xl font-bold text-gray-800">Praia de Jurerê</h2>

                            <img
                                src="./elementos_temporarios/jurere.svg"
                                alt="Praia de Jurerê"
                                className="rounded-xl w-full object-cover"
                            />

                            <div className="text-gray-700 text-sm leading-relaxed flex-1">
                                {isLoadingDescricao ? (
                                    <div className="space-y-2 animate-pulse">
                                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-shimmer"></div>
                                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-shimmer w-5/6"></div>
                                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-shimmer w-4/6"></div>
                                    </div>
                                ) : (
                                    <p>{descricao}</p>
                                )}
                            </div>

                            <button
                                onClick={handleVerNoMapa}
                                className={`
                                    flex items-center justify-center gap-4 w-full py-2 rounded-[8px]
                                    text-white
                                    transition-all duration-200
                                    cursor-pointer
                                    font-bold
                                    ${temaConfig[tema].button}
                                `}
                                style={{
                                    boxShadow: `0 2px 0 0 ${temaConfig[tema].shadowColor}`
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = 'translateY(2px)'
                                    e.currentTarget.style.boxShadow = `0 1px 0 0 ${temaConfig[tema].shadowColor}`
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = 'translateY(4px)'
                                    e.currentTarget.style.boxShadow = `0 0px 0 0 ${temaConfig[tema].shadowColor}`
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = `0 2px 0 0 ${temaConfig[tema].shadowColor}`
                                }}
                            >
                                Ver no mapa
                            </button>
                        </div>

                        {/* LADO DIREITO — CHAT */}
                        <div className="w-1/2 border-l border-gray-200 flex flex-col relative bg-gradient-to-b from-blue-50/30 to-white">

                            {/* ÁREA DAS MENSAGENS */}
                            <div className="flex-1 overflow-y-auto py-6 p-4 space-y-3">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start items-end"}`}
                                    >
                                        {/* Avatar do Tainho (só aparece nas mensagens do bot) */}
                                        {message.sender === "bot" && (
                                            <img
                                                src="./tainho/tainho_picture_profile.svg"
                                                alt="Tainho"
                                                className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                                            />
                                        )}

                                        <div
                                            className={`
                                                px-4 py-2.5 rounded-2xl max-w-[85%] shadow-sm text-sm
                                                ${message.sender === "user"
                                                    ? "bg-white text-gray-800 rounded-br-none"
                                                    : `${temaConfig[tema].bubble} text-gray-800 rounded-bl-none`
                                                }
                                            `}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start items-end">
                                        {/* Avatar do Tainho no loading também */}
                                        <img
                                            src="./tainho/tainho_picture_profile.svg"
                                            alt="Tainho"
                                            className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                                        />

                                        <div className={`${temaConfig[tema].bubble} text-gray-800 px-4 py-2.5 rounded-2xl rounded-bl-none shadow-sm`}>
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* ÁREA DE BOTÕES DE PROMPTS */}
                            <div className="border-t border-gray-200 p-3 bg-white">
                                <div className="grid grid-cols-2 gap-2">
                                    {promptOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handlePromptClick(option.prompt, option.label)}
                                            disabled={isLoading}
                                            className={`
                                                px-3 py-2 text-xs font-bold
                                                rounded-[8px] w-full
                                                bg-transparent
                                                border-2
                                                transition-all duration-200
                                                disabled:opacity-50 disabled:cursor-not-allowed
                                                cursor-pointer
                                                ${temaOutline[tema].border}
                                                ${temaOutline[tema].text}
                                            `}
                                            style={{
                                                boxShadow: `0 2px 0 0 ${temaOutline[tema].shadowColor}`
                                            }}
                                            onMouseDown={(e) => {
                                                if (!isLoading) {
                                                    e.currentTarget.style.transform = 'translateY(2px)'
                                                    e.currentTarget.style.boxShadow = `0 1px 0 0 ${temaOutline[tema].shadowColor}`
                                                }
                                            }}
                                            onMouseUp={(e) => {
                                                if (!isLoading) {
                                                    e.currentTarget.style.transform = 'translateY(4px)'
                                                    e.currentTarget.style.boxShadow = `0 0px 0 0 ${temaOutline[tema].shadowColor}`
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isLoading) {
                                                    e.currentTarget.style.transform = 'translateY(0)'
                                                    e.currentTarget.style.boxShadow = `0 2px 0 0 ${temaOutline[tema].shadowColor}`
                                                }
                                            }}
                                        >
                                            {option.label}
                                        </button>

                                    ))}
                                </div>
                            </div>

                            {/* AVATAR DO MASCOTE */}
                            <div className="absolute bottom-20 right-3">
                                <div className="relative">
                                    <img
                                        src="./tainho/tainho_picture_profile.svg"
                                        alt="Tainho"
                                        className="w-16 h-16 drop-shadow-lg"
                                    />
                                    {isLoading && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}