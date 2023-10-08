import { SmileySad } from "phosphor-react";

interface Props {
  text?: string;
}
export function ErrorAlert(props: Props) {
  return (
    <div className="alert alert-error shadow-lg">
      <SmileySad className="w-6 h-6" />
      <span className="text-error-content">{props.text ?? "Erro! Não foi possível buscar os dados."}</span>
    </div>
  );
}
