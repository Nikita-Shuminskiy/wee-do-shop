import i18n from 'i18next';
import { locale } from 'expo-localization';
import {initReactI18next} from 'react-i18next';
import en from './locales/en';
import ru from './locales/ru';

export const resources = {
  en: en,
  ru: ru,
} as const;
console.log({locale})
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: locale,
  debug: false,
  resources: resources,
  ns: [
    'main',
    'errors',
    'login',
    'registration',
    'common',
  ],
  defaultNS: 'main',
  react: { useSuspense: false }, //this line
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
