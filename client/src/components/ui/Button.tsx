"use client";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes } from "react";
import { SpinLoading } from "./Loading/SpinLoading";

export const buttonStyle = cva("btn cursor-pointer", {
  variants: {
    bg: {
      ghost: "btn-ghost",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      submit: "btn-success",
      info: "btn-info",
      warning: "btn-warning",
      danger: "btn-error",
    },
    circle: {
      true: "btn-circle",
    },
    outline: {
      true: "btn-outline",
    },
  },
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyle> {
  asChild?: boolean;
  tooltipText?: string;
  tooltipBottom?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
}

export function Button({
  bg,
  circle,
  outline,
  asChild,
  tooltipText,
  tooltipBottom,
  isLoading = false,
  ...props
}: Props) {
  const BaseComponent = asChild && !isLoading ? Slot : "button";

  const isDisabled = isLoading || props.disabled;

  const Component = () => (
    <BaseComponent className={buttonStyle({ bg, circle, outline })} {...props} disabled={isDisabled}>
      {isLoading ? <SpinLoading /> : props.children}
    </BaseComponent>
  );

  if (tooltipText) {
    return (
      <div className={`tooltip ${tooltipBottom ? "tooltip-bottom" : "tooltip-left"}`} data-tip={tooltipText}>
        <Component />
      </div>
    );
  }

  return <Component />;
}
