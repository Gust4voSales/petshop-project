import Link from "next/link";

export default function Home() {
  return (
    <main className="text-xl h-screen flex items-center justify-center flex-col">
      <h1 className="bg-slate-600 text-white py-1 px-4 w-fit text-xl">Home Page</h1>
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}
