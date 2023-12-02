import { SortDirection } from "@tanstack/react-table";
import { CaretDown, CaretUp } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  sortingOrder: SortDirection | false; //  "asc" | "desc" | false;
}

export function SortColumnButton({ sortingOrder, ...props }: Props) {
  const Icon = () => {
    if (sortingOrder === false) {
      // no sorting active
      return <CaretUp size={20} weight="duotone" />;
    }
    if (sortingOrder === "asc") {
      return <CaretUp size={20} weight="fill" />;
    }
    return <CaretDown size={20} weight="fill" />;
  };

  return (
    <button className="tooltip tooltip-bottom btn-ghost rounded-full p-1" data-tip="Ordenar" {...props}>
      <Icon />
    </button>
  );
}
