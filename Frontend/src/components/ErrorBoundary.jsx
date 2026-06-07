import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "white" }}>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem", color: "white" }}>
      <h1>Something went wrong!</h1>
      <p>{error?.message || "Unknown error occurred."}</p>
    </div>
  );
}
