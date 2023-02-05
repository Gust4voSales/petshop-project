import * as RadixScrollArea from "@radix-ui/react-scroll-area";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const ScrollThumb = () => <RadixScrollArea.Thumb className="flex-1 bg-accent rounded-full relative" />;

export function ScrollArea(props: Props) {
  return (
    <RadixScrollArea.Root type="auto" className={props.className}>
      <RadixScrollArea.Viewport className="rounded-lg">{props.children}</RadixScrollArea.Viewport>

      <RadixScrollArea.Scrollbar orientation="vertical" className="scrollbar w-3 px-0.5 py-1 rounded-r-lg">
        <ScrollThumb />
      </RadixScrollArea.Scrollbar>

      <RadixScrollArea.Scrollbar orientation="horizontal" className="scrollbar h-3 flex-col px-1 py-0.5 rounded-b-lg">
        <ScrollThumb />
      </RadixScrollArea.Scrollbar>

      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
}
