import { Modal, Button } from "react-bootstrap";

function DeleteConfirmationModal({
  show,
  title = "Remove Product Confirmation",
  yesButton = "Yes",
  noButton = "No",
  onClose,
  onConfirm,
}) {
  function handleClose(e) {
    e?.preventDefault();

    if (onClose) {
      onClose();
    }
  }

  function handleConfirm(e) {
    e.preventDefault();

    if (onConfirm) {
      onConfirm();
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove this card? Once removed it can't be
        reverted!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {noButton}
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {yesButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
