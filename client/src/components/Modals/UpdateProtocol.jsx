import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { protocolValidationSchema } from "../../schemas/protocolValidationSchema";
import { useDispatch } from "react-redux";
import {
  updateProtocol,
  getAllProtocolsByOfficerID,
} from "../../redux/slices/protocolsSlice";

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

const UpdateProtocol = ({ open, setIsOpen, protocol }) => {
  const dispatch = useDispatch();

  const initialValues = {
    serviceNotes: protocol.serviceNotes,
    fineAmount: protocol.fineAmount,
    violatorFullName: protocol.violatorFullName,
    violatorPassportNumber: protocol.violatorPassportNumber,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(
        updateProtocol({
          parkOfficerID: protocol.officerId,
          protocolID: protocol.id,
          updatedData: values,
        })
      );
      await dispatch(getAllProtocolsByOfficerID(protocol.officerId));
      resetForm();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating protocol:", error);
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>Edit Protocol № {protocol.id}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={protocolValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <label>
              Service Notes:
              <Field name="serviceNotes" />
              <ErrorMessage name="serviceNotes" component="div" />
            </label>

            <label>
              Fine Amount:
              <Field name="fineAmount" type="number" />
              <ErrorMessage name="fineAmount" component="div" />
            </label>

            <label>
              Violator Full Name:
              <Field name="violatorFullName" />
              <ErrorMessage name="violatorFullName" component="div" />
            </label>

            <label>
              Violator Passport Number:
              <Field name="violatorPassportNumber" />
              <ErrorMessage name="violatorPassportNumber" component="div" />
            </label>

            <button type="submit">Edit</button>
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateProtocol;
