import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function ExternalLink(props: Props) {
  return (
    <a {...props} rel="noopener noreferrer" target="_blank">
      {props.children}
    </a>
  );
}
