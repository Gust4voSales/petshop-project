interface Props {
  title: string;
}
export function PageTitle(props: Props) {
  return (
    <div className="prose">
      <h1>{props.title}</h1>
    </div>
  );
}
