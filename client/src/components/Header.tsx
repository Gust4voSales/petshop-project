"use client";
import Link from "next/link";
import { SignIn } from "phosphor-react";
import { Button } from "./ui/Button";

export function Header() {
  return (
    <header className="navbar border-b-2">
      <div className="flex-1">
        <Link href="/" className="btn btn-link prose">
          <h1>Petshop</h1>
        </Link>
      </div>

      <Button bg="ghost" tooltipText="Entrar" tooltipBottom asChild>
        <Link href={"/login"}>
          <SignIn className="h-5 w-5" />
        </Link>
      </Button>
    </header>
  );
}
