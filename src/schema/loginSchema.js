import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("enter a  valid username"),
  password: Yup.string().min(8).required("password should be 8 digits"),
});
