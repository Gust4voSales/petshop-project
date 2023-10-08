"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bag, Calendar, Person } from "phosphor-react";
import { Header } from "@components/dashboard/Header";
import { themeChange } from "theme-change";
import { ThemeSelector } from "@components/dashboard/ThemeSelector";

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
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div>
      <Header />

      {/*  h-[calc(100vh-4rem-2px)] --> subtract Header vertical space */}
      <div className="drawer drawer-mobile lg:drawer-open h-[calc(100vh-4rem-2px)]">
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
            <ThemeSelector />
          </ul>
        </div>
      </div>
    </div>
  );
}
