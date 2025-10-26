import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "../../schemas/signInValidationSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/userSlice";

import styles from "./SignIn.module.scss";

const initialValues = {
  email: "",
  password: "",
};
const SignIn = ({ onToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitSignIn = async (values, { resetForm }) => {
    const response = await dispatch(loginUser(values));
    resetForm();

    if (response.meta.requestStatus === "fulfilled") {
      navigate("/officers");
    } else {
      console.error("Login failed", response.payload);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign in</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitSignIn}
        validationSchema={signInValidationSchema}
      >
        {() => (
          <Form className={styles.form}>
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
              id="password"
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
              Login
            </button>
            <p className={styles.switchText}>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={onToggle}
                className={styles.linkBtn}
              >
                Register Now
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
