import { InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from "react";

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className="label" {...props}>
      <span className="label-text">{props.children}</span>
    </label>
  );
};

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="input input-bordered w-full" {...props} />;
};

export const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea className="textarea textarea-bordered h-24 w-full" {...props} />;
};

export const CurrencyInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="input-group">
      <span>R$</span>
      <input type="number" min="0.00" max="10000.00" step="0.01" className="input input-bordered" {...props} />
    </label>
  );
};
