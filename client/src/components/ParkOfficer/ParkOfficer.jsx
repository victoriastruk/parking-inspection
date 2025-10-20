import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteParkOfficer,
  getParkOfficers,
  dismissParkOfficer,
} from "../../redux/slices/parkOfficersSlice";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import UpdateParkOfficer from "../Modals/UpdateParkOfficer";
import styles from "./ParkOfficer.module.scss";
import CreateProtocol from "../Modals/CreateProtocol";

const ParkOfficer = ({ parkOfficer }) => {
  const navigate = useNavigate();

  const [createProtocolModalOpen, setCreateProtocolModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [updateParkOfficerOpen, setUpdateParkOfficerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteParkOfficer(parkOfficer.id));
    await dispatch(getParkOfficers());
  };

  const handleDismiss = async () => {
    await dispatch(dismissParkOfficer(parkOfficer.id));
    await dispatch(getParkOfficers());
  };

  const handleViewProtocols = () => {
    navigate(`/protocols/${parkOfficer.id}`);
  };

  return (
    <article className={styles.cardWrapper}>
      <h1>{parkOfficer.fullName}</h1>
      <p>Badge number: {parkOfficer.badgeNumber}</p>
      <p>District: {parkOfficer.district}</p>
      <p>{parkOfficer.isWorked ? "Worked" : "Nor worked"}</p>

      <button onClick={handleViewProtocols}>View protocols</button>
      {parkOfficer.isWorked && (
        <button onClick={() => setCreateProtocolModalOpen(true)}>
          Create protocol
        </button>
      )}
      {createProtocolModalOpen && (
        <CreateProtocol
          open={createProtocolModalOpen}
          setIsOpen={setCreateProtocolModalOpen}
          officerId={parkOfficer.id}
        />
      )}
      
      <button onClick={() => setDeleteConfirmationModalOpen(true)}>
        Delete
      </button>
      {deleteConfirmationModalOpen && (
        <DeleteConfirmation
          open={deleteConfirmationModalOpen}
          setIsOpen={setDeleteConfirmationModalOpen}
          officerFullName={parkOfficer.fullName}
          deleteCallback={handleDelete}
        />
      )}

      <button onClick={() => setUpdateParkOfficerOpen(true)}>Edit</button>

      {updateParkOfficerOpen && (
        <UpdateParkOfficer
          open={updateParkOfficerOpen}
          setIsOpen={setUpdateParkOfficerOpen}
          officer={parkOfficer}
        />
      )}
      {parkOfficer.isWorked && <button onClick={handleDismiss}>Dismiss</button>}
    </article>
  );
};

export default ParkOfficer;
