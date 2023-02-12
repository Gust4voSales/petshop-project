import { Button } from "@components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "phosphor-react";

interface Props {
  title: string;
  back?: string;
}
export function PageTitle(props: Props) {
  return (
    <div className="flex items-center gap-2">
      {props.back && (
        <Button bg="ghost" circle tooltipText="Voltar" tooltipBottom asChild>
          <Link href={props.back}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
      )}
      <div className="prose">
        <h2>{props.title}</h2>
      </div>
    </div>
  );
}
