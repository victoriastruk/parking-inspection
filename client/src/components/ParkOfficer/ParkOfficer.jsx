import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteParkOfficer,
  getParkOfficers,
  dismissParkOfficer,
  restoreParkOfficer,
} from "../../redux/slices/parkOfficersSlice";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import styles from "./ParkOfficer.module.scss";

const ParkOfficer = ({ parkOfficer, currentPage, officersPerPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const handleEditParkOfficer = () => {
    navigate(`/officers/edit/${parkOfficer.id}`);
  };

  const handleDelete = async () => {
    await dispatch(deleteParkOfficer(parkOfficer.id));
    await dispatch(
      getParkOfficers({
        limit: officersPerPage,
        offset: (currentPage - 1) * officersPerPage,
      })
    );
  };

  const handleDismiss = async () => {
    await dispatch(dismissParkOfficer(parkOfficer.id));
    await dispatch(
      getParkOfficers({
        limit: officersPerPage,
        offset: (currentPage - 1) * officersPerPage,
      })
    );
  };

  const handleRestore = async () => {
    await dispatch(restoreParkOfficer(parkOfficer.id));
    await dispatch(
      getParkOfficers({
        limit: officersPerPage,
        offset: (currentPage - 1) * officersPerPage,
      })
    );
  };

  const handleViewProtocols = () => {
    navigate(`/protocols/${parkOfficer.id}`);
  };

  const handleCreateProtocols = () => {
    navigate(`/protocols/create/${parkOfficer.id}`);
  };

  return (
    <article className={styles.cardWrapper}>
      <h1>{parkOfficer.fullName}</h1>
      <p>Badge number: {parkOfficer.badgeNumber}</p>
      <p>District: {parkOfficer.district}</p>
      <p>{parkOfficer.isWorked ? "Working" : "Not working"}</p>

      <button onClick={handleViewProtocols}>View protocols</button>
      {parkOfficer.isWorked && (
        <button onClick={handleCreateProtocols}>Create protocol</button>
      )}

      <button onClick={() => setDeleteConfirmationModalOpen(true)}>
        Delete
      </button>
      {deleteConfirmationModalOpen && (
        <DeleteConfirmation
          open={deleteConfirmationModalOpen}
          setIsOpen={setDeleteConfirmationModalOpen}
          title="Delete park officer"
          message={`Are you sure you want to delete ${parkOfficer.fullName}?`}
          deleteCallback={handleDelete}
        />
      )}

      <button onClick={handleEditParkOfficer}>Edit</button>
      {parkOfficer.isWorked ? (
        <button onClick={handleDismiss}>Dismiss</button>
      ) : (
        <button onClick={handleRestore}>Restore</button>
      )}
    </article>
  );
};

export default ParkOfficer;
