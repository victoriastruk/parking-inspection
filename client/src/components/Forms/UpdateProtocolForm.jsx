import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { protocolValidationSchema } from "../../schemas/protocolValidationSchema";
import { useDispatch } from "react-redux";
import {
  updateProtocol,
  getAllProtocolsByOfficerID,
} from "../../redux/slices/protocolsSlice";

const UpdateProtocolForm = ({ protocol }) => {
  const navigate = useNavigate();
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
      navigate(`/protocols/${protocol.officerId}`);
    } catch (error) {
      console.error("Error creating protocol:", error);
    }
  };

  return (
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
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProtocolForm;
