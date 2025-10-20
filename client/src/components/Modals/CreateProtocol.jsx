import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { protocolValidationSchema } from "../../schemas/protocolValidationSchema";
import { useDispatch } from "react-redux";
import { createProtocol } from "../../redux/slices/protocolsSlice";

const initialValues = {
  serviceNotes: "",
  fineAmount: "",
  violatorFullName: "",
  violatorPassportNumber: "",
};

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

const CreateProtocol = ({ open, setIsOpen, officerId }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Відправляємо правильно структуровані дані
      await dispatch(
        createProtocol({
          parkOfficerID: officerId,
          protocol: {
            ...values,
            fineAmount: Number(values.fineAmount), // конвертація у число
          },
        })
      );

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
      <h2>Create Protocol</h2>
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

            <button type="submit">Create Protocol</button>
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateProtocol;
