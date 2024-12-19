import { Spinner, Stack } from "react-bootstrap";

function Loading({ message = "Loading..." }) {
  return (
    <Stack gap={3} className="justify-content-center align-items-center">
      <Spinner animation="border" role="status" />
      <span>{message}</span>
    </Stack>
  );
}

export default Loading;
