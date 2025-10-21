import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "../../schemas/signUpValidationSchema";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/userSlice";
const initialValues = {
  nickname: "",
  email: "",
  password: "",
};
const SignUp = () => {
  const dispatch = useDispatch();

  const handleSubmitSignUp = async (values, { resetForm }) => {
    await dispatch(registerUser(values));
    resetForm();
  };
  return (
    <>
      <h2>Sign up</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitSignUp}
        validationSchema={signUpValidationSchema}
      >
        {() => (
          <Form>
            <label>
              Nickname:
              <Field
                name="nickname"
                autoComplete="off"
                placeholder="superUser123"
              />
              <ErrorMessage name="nickname" component="div" />
            </label>

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
            <button type="submit">Registration</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
