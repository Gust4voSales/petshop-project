"use client";

import { Button } from "@/components/ui/Button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "phosphor-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  const pathname = usePathname();
  const [showWarning, setShowWarning] = useState(true);
  const aboutPageURL = pathname.includes("dashboard") ? "/dashboard/about" : "/#about-section";

  return (
    <QueryClientProvider client={client}>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-base-300 text-base-content",
          success: {
            iconTheme: {
              primary: "hsl(var(--su))",
              secondary: "hsl(var(--suc))",
            },
          },
          error: {
            iconTheme: {
              primary: "hsl(var(--er))",
              secondary: "hsl(var(--erc))",
            },
          },
        }}
      />
      {children}

      {showWarning && (
        <div
          role="alert"
          className="alert alert-warning w-full lg:w-1/2 fixed top-20 left-1/2 -translate-x-1/2 z-10 animate-pulse px-10"
        >
          <div className="absolute top-0 right-0">
            <Button bg="ghost" circle onClick={() => setShowWarning(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-justify">
            Conforme explicado{" "}
            <Link href={aboutPageURL} className="link" prefetch={false}>
              aqui
            </Link>
            , este projeto utiliza recursos e hospedagem gratuitas. Portanto, após um tempo inativo, o servidor é
            desligado e será reiniciado automaticamente quando acessado. Isto pode demorar de 1~3 MINUTOS. Não se
            espante se a primeira requisição demorar carregando...
          </span>
        </div>
      )}
    </QueryClientProvider>
  );
}
