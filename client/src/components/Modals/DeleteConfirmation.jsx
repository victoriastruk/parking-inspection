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

const DeleteConfirmation = ({
  open,
  setIsOpen,
  title = "Delete item",
  message = "Are you sure you want to delete this item?",
  deleteCallback,
}) => {
  const handleDelete = async () => {
    await deleteCallback();
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>{title}</h2>
      <p>{message}</p>

      <button onClick={handleDelete}>Yes</button>
      <button onClick={() => setIsOpen(false)}>No</button>
    </Modal>
  );
};

export default DeleteConfirmation;
