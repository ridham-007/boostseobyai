"use client";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import Header from "./_header/page";
import Footer from "./_footer/page";

const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"en"} suppressHydrationWarning>
      <head></head>
      <body
        className={`${inter.className} flex w-full max-w-[1440px] mx-auto min-h-dvh overflow-auto`}
        suppressHydrationWarning={true}
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex flex-col w-full px-3 sm:px-10">
          <Header />
          <div className="flex flex-col w-full flex-1">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
