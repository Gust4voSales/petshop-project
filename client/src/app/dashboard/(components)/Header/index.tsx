export function Header() {
  return (
    <header className="w-full h-8 flex justify-between items-center px-2 bg-blue-500">
      <h1>Petshop</h1>

      <div>
        <span>Usuário Logado</span>

        <button>Sair</button>
      </div>
    </header>
  );
}
