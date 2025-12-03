import Image from "next/image";
import TextBalloon from "./TextBalloon";

export default function TainhoPortal({ text = "PINTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO" }) {
    return (
        <div className="relative flex justify-center shrink-0 ">
            {/* Fundo */}
            <Image src="/tainho/FundoFloripa.svg" alt="" width={440} height={788} />

            {/* Balão de fala */}
            <TextBalloon text={text}/>

            {/* Tainho */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                <Image src="/tainho/TainhoParado.svg" alt="" width={332} height={380} />
            </div>
        </div>
    );
}
