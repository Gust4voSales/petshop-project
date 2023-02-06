import { QueryStatus } from "@tanstack/react-query";
import { EmptyContent } from "./ui/EmptyContent";
import { ErrorAlert } from "./ui/ErrorAlert";
import { Loading } from "./ui/Loading";

interface Props {
  status: QueryStatus;
  children: React.ReactNode;
  emptyContent?: JSX.Element | boolean;

  loadingFallback?: JSX.Element;
  renderLoading?: boolean;

  errorFallback?: JSX.Element;
  renderError?: boolean;
}

/**
 * Component used to render asynchronous data. For example, render a list fetched from the API
 *
 * @param status Possible status: 'loading' | 'error' | 'success'. They control what this component should render
 * @param children The component to render when status='success'
 * @param emptyContent Optional parameter. Render the EmptyContent default component on status='success' instead of children if passed as true. If passed with a component then use it
 * @param renderLoading Optional parameter. Whether it should render the Loading component if status='loading'. Defaults to true
 * @param loadingFallback Optional parameter. Custom Loading component
 * @param renderError Optional parameter. Whether it should render the Error component if status='error'. Defaults to true
 * @param errorFallback Optional parameter. Custom Error component
 *
 * @returns A component based on the possible status
 */
export function AsynchronousContent({ renderLoading = true, renderError = true, ...props }: Props) {
  if (props.status === "loading") {
    if (renderLoading) return props.loadingFallback ?? <Loading />;
    return null;
  }

  if (props.status === "error") {
    if (renderError) return props.errorFallback ?? <ErrorAlert />;
    return null;
  }

  // Use default EmptyContent component
  if (props.emptyContent === true) {
    return <EmptyContent />;
  } else if (props.emptyContent) {
    // use the EmptyContent component provided
    return props.emptyContent;
  }

  return <>{props.children}</>;
}
