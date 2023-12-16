"use client";

import Link from "next/link";
import { Button } from "@components/ui/Button";
import { List, SignOut } from "phosphor-react";
import { useSessionStore } from "src/stores/session";
import { useEffect } from "react";

export function SignedInHeader() {
  const [user, signOutUser] = useSessionStore((state) => [state.user, state.signOut]);

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

      <div className="flex-1 ">
        <Link href="/" className="btn btn-link prose hidden lg:block">
          <h1>Petshop</h1>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold underline">{user?.name}</span>

        <Button onClick={handleSignOut} bg="ghost" tooltipText="Sair" tooltipBottom>
          <SignOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
