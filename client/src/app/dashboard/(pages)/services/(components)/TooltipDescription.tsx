import * as Tooltip from "@radix-ui/react-tooltip";
import { Article } from "phosphor-react";

interface Props {
  description: string;
}
export function TooltipDescription(props: Props) {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Article className="w-5 h-5" />
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content className="prose bg-primary-focus max-w-xs p-2 mx-2 animate-show rounded-lg shadow-md">
            <h3 className="mb-1">Descrição</h3>
            <span>{props.description}</span>
            <Tooltip.Arrow className="fill-primary-focus w-4 h-2" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
