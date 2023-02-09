import React from "react";
import { Label } from "../Label";
import { inputStyle, Props } from "./InputTypes";

function InputComponent({ errorMessage, ...props }: Props, ref: React.ForwardedRef<HTMLInputElement>) {
  return (
    <>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <input className={inputStyle({ errorBorder: !!errorMessage })} ref={ref} {...props} />
      <Label error>{errorMessage}</Label>
    </>
  );
}

export const Input = React.forwardRef(InputComponent);
