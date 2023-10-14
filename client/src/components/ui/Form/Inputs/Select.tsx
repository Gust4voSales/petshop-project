import React from "react";
import { Label } from "../Label";
import { inputStyle, Props } from "./InputTypes";

function SelectComponent(
  { errorMessage, ...props }: Props<HTMLSelectElement>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <select className={inputStyle({ errorBorder: !!errorMessage }) + "select select-bordered"} ref={ref} {...props} />
      <Label error>{errorMessage}</Label>
    </>
  );
}

export const Select = React.forwardRef(SelectComponent);
