import Link from "next/link";
import { Button } from "@components/ui/Button";
import { List, SignIn, SignOut } from "phosphor-react";
import { usePathname } from "next/navigation";
import { useSessionStore } from "src/stores/session";

export function Header() {
  const [user, signOutUser] = useSessionStore((state) => [state.user, state.signOut]);

  const currentRoute = usePathname();

  function handleSignOut() {
    signOutUser();
  }

  return (
    <header className="navbar border-b-2">
      <Button bg="ghost" asChild>
        <label htmlFor="sidebar-drawer" className="drawer-button lg:hidden">
          <List className="h-5 w-5" />
        </label>
      </Button>

      <div className="flex-1">
        <Link href="/" className="btn btn-link prose">
          <h1>Petshop</h1>
        </Link>
      </div>

      {currentRoute !== "/login" ? (
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold underline">{user?.name}</span>

          <Button onClick={handleSignOut} bg="ghost" tooltipText="Sair" tooltipBottom>
            <SignOut className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <Button bg="ghost" tooltipText="Entrar" tooltipBottom asChild>
          <Link href={"/login"}>
            <SignIn className="h-5 w-5" />
          </Link>
        </Button>
      )}
    </header>
  );
}
