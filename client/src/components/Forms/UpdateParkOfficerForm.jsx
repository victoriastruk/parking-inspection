import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateParkOfficer,
  getParkOfficers,
} from "../../redux/slices/parkOfficersSlice";
import { parkOfficerValidationSchema } from "../../schemas/parkOfficerValidationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UpdateParkOfficerForm = ({ officer }) => {
  const navigate = useNavigate()
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
      navigate('/officers');
      await dispatch(getParkOfficers());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={parkOfficerValidationSchema}
      onSubmit={handleUpdateForm}
    >
      {() => (
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
        </Form>
      )}
    </Formik>
  );
};

export default UpdateParkOfficerForm;
