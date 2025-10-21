import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "../../schemas/signInValidationSchema";
import { useDispatch} from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";

const initialValues = {
  email: "",
  password: "",
};
const SignIn = () => {
  const dispatch = useDispatch();

  const handleSubmitSignIn = async (values, { resetForm }) => {
    await dispatch(loginUser(values));
    resetForm();
  };
  return (
    <>
      <h2>Sign in</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitSignIn}
        validationSchema={signInValidationSchema}
      >
        {() => (
          <Form>
            <label>
              Email:
              <Field
                name="email"
                autoComplete="off"
                placeholder="superUser@test.com"
              />
              <ErrorMessage name="email" component="div" />
            </label>

            <label>
              Password:
              <Field
                name="password"
                type="password"
                autoComplete="off"
                placeholder="gr3at@3wdsG"
              />
              <ErrorMessage name="password" component="div" />
            </label>
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
