import * as yup from "yup";

export const protocolValidationSchema = yup.object().shape({
  serviceNotes: yup.string().trim().required("Service notes are required"),

  fineAmount: yup
    .number()
    .typeError("Fine amount must be a number")
    .positive("Fine amount must be greater than 0")
    .required("Fine amount is required"),

  violatorFullName: yup
    .string()
    .trim()
    .min(3, "Violator full name must be at least 3 characters")
    .required("Violator full name is required"),

  violatorPassportNumber: yup
    .string()
    .trim()
    .matches(
      /^[A-Z0-9]+$/,
      "Passport number must contain only letters and numbers"
    )
    .min(5, "Passport number must be at least 5 characters")
    .required("Violator passport number is required"),
});
