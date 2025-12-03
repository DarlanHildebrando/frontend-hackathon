export default function TextBalloon({ text }: { text: string }) {
    return (
        <>
            
            <div className="absolute bottom-[410px] left-1/2 -translate-x-1/2 letraPula">
                <div className="bg-white rounded-[12px] shadow-lg px-5 py-3 text-[#066C89] wrap-break-word font-semibold text-center max-w-[280px] relative">
                    {/* Texto dinâmico */}
                    {text}
                    {/* Triangulinho do balão (AGORA EM CIMA) */}
                    
                    <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-0 h-0 border-l-12 border-l-transparent border-r-12 border-r-transparent border-t-12 border-t-white"> </div>
                </div>
            </div>
        </>
    )
}
