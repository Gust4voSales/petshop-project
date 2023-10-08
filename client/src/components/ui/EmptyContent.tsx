import { Info } from "phosphor-react";

interface Props {
  text?: string;
}
export function EmptyContent(props: Props) {
  return (
    <div className="alert shadow-lg">
      <Info className="w-6 h-6" />
      <span>{props.text ?? "Nenhum dado encontrado."}</span>
    </div>
  );
}
