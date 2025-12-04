import Image from "next/image";
import TextBalloon from "./TextBalloon";

export default function TainhoPortal({ text = "PINTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO" }) {
    return (
        <div className="relative flex justify-start items-start shrink-0 h-[508px]">
            {/* Fundo */}
            <Image src="/tainho/FundoFloripa.svg" alt="" width={340} height={508} />

            {/* Balão de fala */}
            <TextBalloon text={text}/>

            {/* Tainho */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                <Image src="/tainho/TainhoParado.svg" alt="" width={332} height={380} />
            </div>
        </div>
    );
}
