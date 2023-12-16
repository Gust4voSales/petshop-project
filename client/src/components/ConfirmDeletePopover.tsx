import * as Popover from "@radix-ui/react-popover";
import { TrashSimple } from "phosphor-react";
import { buttonStyle } from "./ui/Button";

interface Props {
  onConfirmDelete: () => void;
}
export function ConfirmDeletePopover(props: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger className="tooltip tooltip-left" data-tip="Remover">
        <div className={buttonStyle({ bg: "danger", circle: true })}>
          <TrashSimple className="w-6 h-6" />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="prose flex flex-col gap-3 bg-base-200 max-w-xs p-2 mx-2 animate-show rounded-[var(--rounded-btn)] shadow-md border-error border-2"
          sideOffset={2}
        >
          <span>Tem certeza que deseja deletar o item permanentemente?</span>
          <div className="flex items-center justify-between">
            <Popover.Close className="btn btn-outline w-32 px-0 ">Cancelar</Popover.Close>

            <Popover.Close onClick={props.onConfirmDelete} className="btn btn-outline btn-error w-32 px-0">
              Deletar
            </Popover.Close>
          </div>

          <Popover.Arrow className="fill-error w-4 h-2" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
