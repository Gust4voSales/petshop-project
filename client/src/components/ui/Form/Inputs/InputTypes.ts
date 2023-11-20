import { cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

export const inputStyle = cva("input input-bordered w-full placeholder:text-gray-500", {
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