import { Button } from "@components/ui/Button";
import Link from "next/link";
import { Hamburger } from "phosphor-react";

export function Header() {
  return (
    <header className="navbar border-b-2">
      <Button intent="ghost" asChild>
        <label htmlFor="sidebar-drawer" className="drawer-button lg:hidden">
          <Hamburger className="h-5 w-5" />
        </label>
      </Button>

      <div className="flex-1">
        <Link href="/" className="btn btn-link prose">
          <h1>Petshop</h1>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold underline">Usuário Logado</span>
        <Button intent="ghost">Sair</Button>
      </div>
    </header>
  );
}
