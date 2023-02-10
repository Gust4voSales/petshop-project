"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-base-300 text-base-content",
          error: {
            iconTheme: {
              primary: "hsl(var(--er))",
              secondary: "hsl(var(--erc))",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
