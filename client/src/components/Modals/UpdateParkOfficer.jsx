import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import {
  updateParkOfficer,
  getParkOfficers,
} from "../../redux/slices/parkOfficersSlice";
import { parkOfficerValidationSchema } from "../../schemas/parkOfficerValidationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const UpdateParkOfficer = ({ open, setIsOpen, officer }) => {
  const dispatch = useDispatch();

  const initialValues = {
    fullName: officer.fullName,
    badgeNumber: officer.badgeNumber,
    district: officer.district,
  };

  const handleUpdateForm = async (values) => {
    try {
      await dispatch(
        updateParkOfficer({ parkOfficerID: officer.id, updatedData: values })
      );
      await dispatch(getParkOfficers());
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>Edit officer</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={parkOfficerValidationSchema}
        onSubmit={handleUpdateForm}
      >
        {(formikProps) => (
          <Form>
            <label>
              Fullname:
              <Field name="fullName" />
              <ErrorMessage name="fullName" />
            </label>

            <label>
              Badge number:
              <Field name="badgeNumber" />
              <ErrorMessage name="badgeNumber" />
            </label>

            <label>
              District:
              <Field name="district" />
              <ErrorMessage name="district" />
            </label>

            <button type="submit">Update officer</button>
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateParkOfficer;
