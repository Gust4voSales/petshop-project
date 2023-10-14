import { cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

export const inputStyle = cva("input input-bordered w-full", {
  variants: {
    errorBorder: {
      true: "input-error",
    },
  },
});

// interface Props extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputStyle> {
export interface Props<T> extends InputHTMLAttributes<T> {
  label?: string;
  errorMessage?: string;
}