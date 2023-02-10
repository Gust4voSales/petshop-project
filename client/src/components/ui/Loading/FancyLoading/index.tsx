import "./styles.css";

export function FancyLoading() {
  return (
    <div className="relative items-center w-full h-40 overflow-hidden">
      <div className="waterfall [&>div]:bg-base-content">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
