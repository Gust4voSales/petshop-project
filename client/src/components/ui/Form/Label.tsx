import { cva, VariantProps } from "class-variance-authority";
import { LabelHTMLAttributes } from "react";

const labelTextStyle = cva("", {
  variants: {
    error: {
      true: "label-text-alt text-error h-4",
      false: "label-text",
    },
  },
});

interface Props extends LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelTextStyle> {}

export const Label = ({ error, ...props }: Props) => {
  return (
    <label className="label" {...props}>
      <span className={labelTextStyle({ error })}>{props.children}</span>
    </label>
  );
};
