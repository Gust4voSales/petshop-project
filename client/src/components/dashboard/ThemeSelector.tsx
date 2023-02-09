import { CaretDown, PaintRoller } from "phosphor-react";

const THEMES = [
  {
    theme: "dark",
    label: "Dark",
  },
  {
    theme: "light",
    label: "Light",
  },
  {
    theme: "cyberpunk",
    label: "Cyberpunk",
  },
  {
    theme: "night",
    label: "Night",
  },
];

export function ThemeSelector() {
  return (
    <li className="mt-auto dropdown dropdown-top p-0" tabIndex={0}>
      <label>
        <PaintRoller size={24} />
        Tema
        <CaretDown size={18} className="ml-auto" />
      </label>

      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-300 w-52 left-0 gap-2">
        {THEMES.map((theme) => (
          <li
            key={theme.theme}
            data-set-theme={theme.theme}
            data-act-class="outline"
            className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
          >
            <div
              data-theme={theme.theme}
              className="justify-between bg-base-100 text-base-content w-full cursor-pointer font-sans"
            >
              <span>{theme.label}</span>

              <div className="flex gap-1 [&>div]:w-2 [&>div]:h-6 [&>div]:rounded-full">
                <div className="bg-accent" />
                <div className="bg-primary" />
                <div className="bg-secondary" />
                <div className="bg-neutral" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}
