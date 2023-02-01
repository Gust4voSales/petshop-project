import { Header } from "./(components)/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
          <ul className="menu p-4 w-60 bg-base-100 text-base-content">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
