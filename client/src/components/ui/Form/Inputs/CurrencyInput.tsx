import React from "react";
import { Label } from "../Label";
import { inputStyle, Props } from "./InputTypes";
import CurrencyInputLib from "react-currency-input-field";

export const CurrencyInputComponent = (
  { errorMessage, label, ...props }: Props<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  return (
    <div>
      {label && <Label htmlFor={props.name}>{label}</Label>}

      <label className="input-group input-error">
        <span>R$</span>
        <CurrencyInputLib
          ref={ref}
          className={inputStyle({ errorBorder: !!errorMessage })}
          {...props}
          // onValueChange={(value: any, name: any) => console.log(value, name)}
          decimalsLimit={2}
          allowNegativeValue={false}
          decimalScale={2}
          intlConfig={{ locale: "pt-BR" }}
          defaultValue={props.defaultValue ? Number(props.defaultValue) : undefined}
          step={undefined}
          maxLength={undefined}
        />
      </label>
      {errorMessage && <Label error>{errorMessage}</Label>}
    </div>
  );
};

export const CurrencyInput = React.forwardRef(CurrencyInputComponent);
