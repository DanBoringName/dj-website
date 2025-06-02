import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || "Unknown error";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-white mb-4">Oops!</h1>
        <p className="text-neutral-400 mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-neutral-500 italic">{errorMessage}</p>
      </div>
    </div>
  );
}
