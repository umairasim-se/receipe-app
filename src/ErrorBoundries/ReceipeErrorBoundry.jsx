import Alert from "@mui/material/Alert";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Alert severity="error">
      Something went wrong:
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </Alert>
  );
}

export default ErrorFallback;
