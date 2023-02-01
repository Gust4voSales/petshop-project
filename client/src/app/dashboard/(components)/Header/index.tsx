import Link from "next/link";

export function Header() {
  return (
    <header className="navbar border-b-2">
      <label htmlFor="sidebar-drawer" className="btn btn-ghost drawer-button lg:hidden">
        =
      </label>
      <div className="flex-1">
        <Link href="/" className="btn btn-link prose">
          <h1>Petshop</h1>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold underline">Usuário Logado</span>
        <button className="btn btn-ghost">Sair</button>
      </div>
    </header>
  );
}
