import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes } from "react";

const buttonStyle = cva("btn cursor-pointer", {
  variants: {
    intent: {
      ghost: "btn-ghost",
      circle: "btn-circle",
    },
    bg: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      submit: "btn-success",
      info: "btn-info",
      warning: "btn-warning",
      danger: "btn-error",
    },
  },
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyle> {
  asChild?: boolean;
  tooltipText?: string;
  tooltipBottom?: boolean;
  children: React.ReactNode;
}

export function Button({ intent, bg, asChild, tooltipText, tooltipBottom, ...props }: Props) {
  const BaseComponent = asChild ? Slot : "button";

  const Component = () => (
    <BaseComponent className={buttonStyle({ intent, bg })} {...props}>
      {props.children}
    </BaseComponent>
  );

  if (tooltipText) {
    return (
      <div className={`tooltip ${tooltipBottom ? "tooltip-bottom" : "tooltip-top"}`} data-tip={tooltipText}>
        <Component />
      </div>
    );
  }

  return <Component />;
}
