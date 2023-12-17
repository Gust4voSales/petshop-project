import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "phosphor-react";

interface Props {
  title: string;
  renderBackOption?: boolean;
}
export function PageTitle(props: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      {props.renderBackOption && (
        <Button onClick={router.back} bg="ghost" circle tooltipText="Voltar" tooltipBottom>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      )}
      <div className="prose">
        <h2>{props.title}</h2>
      </div>
    </div>
  );
}
