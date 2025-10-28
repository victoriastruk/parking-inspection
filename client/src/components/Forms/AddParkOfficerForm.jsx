import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { parkOfficerValidationSchema } from "../../schemas/parkOfficerValidationSchema";

import {
  addParkOfficer,
  getParkOfficers,
} from "../../redux/slices/parkOfficersSlice";
import { useDispatch } from "react-redux";

const initialValues = {
  fullName: "",
  badgeNumber: "",
  district: "",
};

const AddParkOfficerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddParkOfficerSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addParkOfficer(values));
      await dispatch(getParkOfficers());
      resetForm();
      navigate("/officers");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={parkOfficerValidationSchema}
      onSubmit={handleAddParkOfficerSubmit}
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

          <button type="submit">Add officer</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddParkOfficerForm;
