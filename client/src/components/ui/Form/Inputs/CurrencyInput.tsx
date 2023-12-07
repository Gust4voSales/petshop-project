import React from "react";
import { Label } from "../Label";
import { inputStyle, Props } from "./InputTypes";
import { maskNumberToCurrency } from "@utils/parseCurrency";

export const CurrencyInputComponent = (
  { errorMessage, ...props }: Props<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value = maskNumberToCurrency(e.target.value);
  }

  return (
    <div>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}

      <label className="input-group input-error">
        <span>R$</span>
        <input
          type="string"
          className={inputStyle({ errorBorder: !!errorMessage })}
          ref={ref}
          {...props}
          onChange={handleChange}
        />
      </label>
      {errorMessage && <Label error>{errorMessage}</Label>}
    </div>
  );
};

export const CurrencyInput = React.forwardRef(CurrencyInputComponent);
