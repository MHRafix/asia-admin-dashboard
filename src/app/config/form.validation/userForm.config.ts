import * as Yup from "yup";

export const UPDATE_PROFILE_DETAILS_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required("Name field is required.")
    .min(3, "Name should have atleast 3 letters."),
  phone: Yup.string().max(16).label("Phone number"),
});

export const PROFILE_DETAILS_FORM_DEFAULT_VALUE = {
  name: "",
  phone: "",
};
