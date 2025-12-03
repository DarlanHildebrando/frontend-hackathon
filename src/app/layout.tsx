import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Fonte Nunito
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"], // ajuste obrigatório!
});

export const metadata: Metadata = {
  title: "island",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={nunito.variable}>
      <body className="font-nunito bg-[#F8FAFA]">
        {children}
      </body>
    </html>
  );
}
