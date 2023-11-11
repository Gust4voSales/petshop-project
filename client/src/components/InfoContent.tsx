type Props = {
  label: string;
  value: string | React.ReactNode;
};

export function InfoContent(props: Props) {
  return (
    <div className="grid grid-cols-2 items-center prose text-base border-b-2 border-base-200 py-4">
      <label className="font-bold">{props.label}</label>
      {typeof props.value === "string" ? <span>{props.value}</span> : props.value}
    </div>
  );
}
