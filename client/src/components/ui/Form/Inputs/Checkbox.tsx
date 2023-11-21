import React from "react";
import { Label } from "../Label";
import { Props } from "./InputTypes";

function CheckboxComponent(
  { errorMessage, ...props }: Props<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <input type="checkbox" ref={ref} {...props} />
      {errorMessage && <Label error>{errorMessage}</Label>}
    </div>
  );
}

export const Checkbox = React.forwardRef(CheckboxComponent);
