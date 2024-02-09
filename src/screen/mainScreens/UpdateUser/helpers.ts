import * as Yup from "yup";
import regex from "../../../utils/helpers/regex";

const schema = (t, countryCode) => {
  return Yup.object().shape({
    email: Yup.string().matches(regex.email,t('errors:incorrectEmail')).notRequired(),
    firstName: Yup.string().trim().notRequired(),
    lastName: Yup.string().trim().notRequired(),
    phone: Yup.string().phone(countryCode.cca2, t('errors:incorrectPhone')).notRequired(),
  });
};
export {schema}