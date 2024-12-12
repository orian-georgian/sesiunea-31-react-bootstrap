import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalConf = ({
  show,
  onHide,
  onConfirm,
  title,
  yesButtonText,
  noButtonText,
  cardId,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="warning-text">Are you sure you want to remove this card? Once removed it can't be reverted!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {noButtonText}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm(cardId);
          }}
        >
          {yesButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConf;
