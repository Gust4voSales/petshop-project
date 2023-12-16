"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Bag, Calendar, Info, Person } from "phosphor-react";
import { Header } from "@components/Header";
import { useSessionStore } from "src/stores/session";

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
    return null;
  }

  if (!isUserLoggedIn) {
    redirect("/login");
  }
  return (
    <div>
      <Header />

      <div className="drawer drawer-mobile lg:drawer-open">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex">
          <main className="w-full p-4">{children}</main>
        </div>

        <div className="drawer-side border-r-2">
          <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 h-full bg-base-100 text-base-content gap-2">
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
