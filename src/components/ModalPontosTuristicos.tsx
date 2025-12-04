"use client"

import { Button } from "./ui/button"
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
            button: "bg-purple-500 hover:bg-purple-600"
        },
        trilha: {
            primary: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
            bubble: "bg-green-100",
            button: "bg-green-500 hover:bg-green-600"
        },
        praia: {
            primary: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
            bubble: "bg-yellow-100",
            button: "bg-yellow-500 hover:bg-yellow-600"
        },
    }

    // Prompts pré-definidos que o usuário pode escolher
    const promptOptions = [
        { id: "historia", label: "📖 História do lugar", prompt: "Seja muito alegre e feliz enquanto responde!!! Conte a história deste lugar em 3 linhas, você é uma mascote (vc se chama tainho) de um site se comunicando com os espectadores (não use texto diferente na frase, ex: fonte em negrito)" },
        { id: "curiosidades", label: "✨ Curiosidades", prompt: "Seja muito alegre enquanto responde!!! Quais são as curiosidades sobre este lugar? me conte em no maximo 3 linhas, você é uma mascote (vc se chama tainho) de um site se comunicando com os espectadores (não use texto diferente na frase, ex: fonte em negrito)" },
        { id: "dicas", label: "💡 Dicas de visita", prompt: "Dê dicas para visitar este lugar, seja simpatico em quanto fala e responda muito resumidamente, você é uma mascote (vc se chama tainho) de um site se comunicando com os espectadores (não use texto diferente na frase, ex: fonte em negrito)" },
        { id: "como-chegar", label: "🗺️ Como chegar", prompt: "Como chegar neste lugar? Se for possivel manda o endereço do local e seja muito breve na resposta, você é uma mascote (vc se chama tainho) de um site se comunicando com os espectadores (não use texto diferente na frase, ex: fonte em negrito)" }
    ]

    // Auto-scroll para última mensagem
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Função para enviar prompt ao backend
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
            // Chamada para o backend do Gemini (SEM TOKEN)
            console.log("🚀 Enviando requisição para o backend...") // DEBUG
            
            const response = await fetch("http://localhost:8080/gemini/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    prompt: `${prompt} sobre a Praia de Jurerê em Florianópolis`
                })
            })

            console.log("📡 Status da resposta:", response.status) // DEBUG

            if (!response.ok) {
                const errorText = await response.text()
                console.error("❌ Erro do servidor:", errorText) // DEBUG
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const data = await response.json()
            console.log("✅ Resposta recebida:", data) // DEBUG
            
            // Adiciona a resposta do bot
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

    if (!open) return null

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
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

                        <p className="text-gray-700 text-sm leading-relaxed flex-1">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>

                        <Button className={`w-full text-white font-bold ${temaConfig[tema].button}`}>
                            Ver no mapa
                        </Button>
                    </div>

                    {/* LADO DIREITO — CHAT */}
                    <div className="w-1/2 border-l border-gray-200 flex flex-col relative bg-gradient-to-b from-blue-50/30 to-white">
                        
                        {/* ÁREA DAS MENSAGENS */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                                            px-3 py-2 text-xs font-medium
                                            bg-gradient-to-r ${temaConfig[tema].primary}
                                            text-white rounded-lg
                                            disabled:opacity-50 disabled:cursor-not-allowed
                                            transition-all duration-200
                                            shadow-sm hover:shadow-md
                                        `}
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
    )
}