import * as Yup from "yup";

const schema = (t, countryCode) => {
  return Yup.object().shape({
    email: Yup.string().email(t('errors:incorrectEmail')).required(t('errors:incorrectEmail')),
    password: Yup.string()
      .min(6, t('errors:passwordMustBe'))
      .required(t('errors:passwordMustBe')),
    firstName: Yup.string().trim().required(t('enterName')),
    lastName: Yup.string().trim().required(t('enterLastName')),
    phone: Yup.string().phone(countryCode.cca2, t('errors:incorrectPhone')).required(t('errors:incorrectPhone')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errors:passwordDontMatch'))
      .required(t('errors:passwordDontMatch')),
  });
};


export {schema}