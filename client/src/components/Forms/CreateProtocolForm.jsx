import { useNavigate, useParams } from "react-router-dom";
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

const CreateProtocolForm = () => {
  const { parkOfficerID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(
        createProtocol({
          parkOfficerID,
          protocol: {
            ...values,
            fineAmount: Number(values.fineAmount),
          },
        })
      );

      resetForm();
      navigate("/officers");
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

          <button type="submit">Create Protocol</button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProtocolForm;
