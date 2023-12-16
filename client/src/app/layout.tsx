import { ProvidersWrapper } from "./ProvidersWrapper";
import "./globals.css";
import { Footer } from "@components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" data-theme="dark">
      <head>
        <title>Petshop</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Projeto de Petshop" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🐾</text></svg>"
        ></link>
      </head>

      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
        <Footer />
      </body>
    </html>
  );
}
