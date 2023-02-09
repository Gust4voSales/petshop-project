import React, { TextareaHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { Label } from "./Label";

export const textAreaStyle = cva("textarea textarea-bordered h-24 w-full", {
  variants: {
    errorBorder: {
      true: "textarea-error",
    },
  },
});

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}
function TextAreaComponent({ label, ...props }: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) {
  return (
    <>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <textarea className={textAreaStyle({ errorBorder: !!props.errorMessage })} ref={ref} {...props} />
      <Label error>{props.errorMessage}</Label>
    </>
  );
}

export const TextArea = React.forwardRef(TextAreaComponent);
