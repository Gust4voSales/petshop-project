import React from "react";
import { Label } from "../Label";
import { inputStyle, Props } from "./InputTypes";

function InputComponent(props: Props, ref: React.ForwardedRef<HTMLInputElement>) {
  return (
    <>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <input className={inputStyle({ errorBorder: !!props.errorMessage })} ref={ref} {...props} />
      <Label error>{props.errorMessage}</Label>
    </>
  );
}

export const Input = React.forwardRef(InputComponent);
