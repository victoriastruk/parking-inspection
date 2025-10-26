import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "../../schemas/signUpValidationSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/slices/userSlice";

import styles from "./SignUp.module.scss";

const initialValues = {
  nickname: "",
  email: "",
  password: "",
};
const SignUp = ({ onToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitSignUp = async (values, { resetForm }) => {
    const response = await dispatch(registerUser(values));
    resetForm();

    if (response.meta.requestStatus === "fulfilled") {
      navigate("/officers");
    } else {
      console.error("Login failed", response.payload);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign up</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitSignUp}
        validationSchema={signUpValidationSchema}
      >
        {() => (
          <Form className={styles.form}>
            <Field
              name="nickname"
              autoComplete="off"
              placeholder="Enter your nickname"
            />
            <ErrorMessage
              className={styles.error}
              name="nickname"
              component="div"
            />

            <Field
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
            />
            <ErrorMessage
              className={styles.error}
              name="email"
              component="div"
            />

            <Field
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Enter your password"
            />
            <ErrorMessage
              className={styles.error}
              name="password"
              component="div"
            />

            <button className={styles.button} type="submit">
              Registration
            </button>

            <p className={styles.switchText}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={onToggle}
                className={styles.linkBtn}
              >
                Sign In
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
