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
function TextAreaComponent({ errorMessage, ...props }: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) {
  return (
    <>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <textarea className={textAreaStyle({ errorBorder: !!errorMessage })} ref={ref} {...props} />
      {errorMessage && <Label error>{errorMessage}</Label>}
    </>
  );
}

export const TextArea = React.forwardRef(TextAreaComponent);
