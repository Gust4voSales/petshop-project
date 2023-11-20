"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({
    // defaultOptions: {
    //   queries: {
    //     cacheTime: 0,
    //   },
    // },
  });

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
    </QueryClientProvider>
  );
}
