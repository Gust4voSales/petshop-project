"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Bag, Calendar, Info, Person } from "phosphor-react";
import { SignedInHeader } from "@components/dashboard/SignedInHeader";
import { useSessionStore } from "src/stores/session";
import { Header } from "@components/Header";
import { FancyLoading } from "@components/ui/Loading/FancyLoading";

const ROUTES = [
  {
    name: "Agendamentos",
    link: "/dashboard/appointments",
    Icon: () => <Calendar size={24} />,
  },
  {
    name: "Clientes",
    link: "/dashboard/customers",
    Icon: () => <Person size={24} />,
  },
  {
    name: "Serviços",
    link: "/dashboard/services",
    Icon: () => <Bag size={24} />,
  },
  {
    name: "Sobre",
    link: "/dashboard/about",
    Icon: () => <Info size={24} />,
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const isUserLoggedIn = useSessionStore((state) => state.isLoggedIn);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center">
          <FancyLoading />
        </div>
      </div>
    );
  }

  if (!isUserLoggedIn) {
    redirect("/login");
  }
  return (
    <div>
      <SignedInHeader />

      <div className="min-h-screen drawer drawer-mobile block lg:drawer-open lg:grid">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex">
          <main className="w-full p-4">{children}</main>
        </div>

        <div className="drawer-side border-r-2 z-10">
          <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 h-full bg-base-100 text-base-content gap-2">
            <Link href="/" className="btn btn-link prose block lg:hidden">
              <h1>Petshop</h1>
            </Link>

            {ROUTES.map((route) => (
              <li key={route.name}>
                <Link href={route.link} className={pathname?.includes(route.link) ? "active" : ""}>
                  <route.Icon />
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
