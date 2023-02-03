"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bag, Calendar, Person } from "phosphor-react";
import { Header } from "./(components)/Header";

const ROUTES = [
  {
    name: "Agendamentos",
    link: "/dashboard/appointments",
    Icon: () => <Calendar size={24} />,
  },
  {
    name: "Clientes",
    link: "/dashboard/clients",
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

  return (
    <div>
      <Header />

      <div className="drawer drawer-mobile">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex">
          <main className="flex-1 w-full p-2">{children}</main>
        </div>

        <div className="drawer-side border-r-2">
          <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 bg-base-100 text-base-content gap-2">
            {ROUTES.map((route) => (
              <li key={route.name}>
                <Link href={route.link} className={pathname === route.link ? "active" : ""}>
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
