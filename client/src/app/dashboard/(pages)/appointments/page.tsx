"use client";
import { Button } from "@components/ui/Button";
import Link from "next/link";

export default function Appointments() {
  return (
    <div>
      APPOINTMENT
      <Button bg="accent" asChild>
        <Link href={"/dashboard/appointments/new"}>Novo agendamento</Link>
      </Button>
    </div>
  );
}
