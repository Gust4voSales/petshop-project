import { Header } from "./(components)/Header";
import { Sidebar } from "./(components)/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        {children}
      </main>
    </>
  );
}
