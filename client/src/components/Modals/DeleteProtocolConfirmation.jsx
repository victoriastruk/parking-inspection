import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const DeleteProtocolConfirmation = ({
  open,
  setIsOpen,
  protocolNumber,
  deleteCallback,
}) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>Delete protocol</h2>
      <p>Are u sure want to delete Protocol № {protocolNumber}?</p>

      <button onClick={deleteCallback}>Yes</button>
      <button onClick={() => setIsOpen(false)}>No</button>
    </Modal>
  );
};

export default DeleteProtocolConfirmation;
