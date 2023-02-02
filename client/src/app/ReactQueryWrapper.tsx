"use client";

import { QueryClient, QueryClientProvider } from "react-query";

export function ReactQueryWrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
