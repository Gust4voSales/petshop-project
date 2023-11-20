import React from "react";
import { Label } from "../Label";
import { inputStyle, Props } from "./InputTypes";

function SelectComponent(
  { errorMessage, ...props }: Props<HTMLSelectElement>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <div>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <select
        className={inputStyle({ errorBorder: !!errorMessage }) + "select select-bordered px-0"}
        ref={ref}
        {...props}
      />
      {errorMessage && <Label error>{errorMessage}</Label>}
    </div>
  );
}

export const Select = React.forwardRef(SelectComponent);
