import React from "react";
import { Label } from "../Label";
import { inputStyle, Props } from "./InputTypes";

export const CurrencyInputComponent = (
  { errorMessage, ...props }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  return (
    <>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}

      <label className="input-group input-error">
        <span>R$</span>
        <input type="number" step="0.01" className={inputStyle({ errorBorder: !!errorMessage })} ref={ref} {...props} />
      </label>
      <Label error>{errorMessage}</Label>
    </>
  );
};

export const CurrencyInput = React.forwardRef(CurrencyInputComponent);
