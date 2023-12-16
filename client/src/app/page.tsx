"use client";
import { About } from "@components/About";
import { Button } from "@components/ui/Button";
import Link from "next/link";
import { CaretDown, CaretUp, PawPrint, SignIn } from "phosphor-react";

export default function Home() {
  const handleScrollBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToAboutSection = () => {
    const element = document.getElementById("about-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col">
      {/* header height is 65px */}
      <header className="navbar border-b-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-link prose">
            <h1>Petshop</h1>
          </Link>
        </div>

        <Button bg="ghost" tooltipText="Entrar" tooltipBottom asChild>
          <Link href={"/login"}>
            <SignIn className="h-5 w-5" />
          </Link>
        </Button>
      </header>

      <section className="hero h-[calc(100vh-66px)] bg-base-100 relativ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold underline flex items-end gap-4 justify-center">
              <PawPrint size={32} weight="fill" /> PETSHOP <PawPrint size={32} weight="fill" />
            </h1>
            <p className="py-6">
              Nesse sistema de Petshop fictício, cadastre clientes, pets e serviços e facilmente gerencie os
              agendamentos.
            </p>
            <Button bg="primary" asChild>
              <Link href="/dashboard">Iniciar</Link>
            </Button>
          </div>
        </div>

        <button
          onClick={handleScrollToAboutSection}
          className="absolute bottom-10 right-1/2 translate-x-1/2 flex items-center justify-center p-2"
        >
          <CaretDown size={32} weight="regular" className="animate-bounce" />
        </button>
      </section>

      <section id="about-section" className="relative h-screen bg-base-300 flex justify-center items-center">
        <About transparentBg={false} />

        <button
          onClick={handleScrollBackToTop}
          className="absolute bottom-2 right-2 flex items-center justify-center p-2"
        >
          <CaretUp size={32} weight="regular" className="animate-bounce" />
        </button>
      </section>
    </div>
  );
}
