import React from "react";
import { Label } from "../Label";
import { inputStyle, Props } from "./InputTypes";

function InputComponent(
  { errorMessage, ...props }: Props<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <input className={inputStyle({ errorBorder: !!errorMessage })} ref={ref} {...props} />
      {errorMessage && <Label error>{errorMessage}</Label>}
    </div>
  );
}

export const Input = React.forwardRef(InputComponent);
