import * as Yup from "yup";

export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("oldPassword cant be empty"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});
