import i18n from "i18next"
import {locale} from "expo-localization"
import {initReactI18next} from "react-i18next"
import en from "./locales/en"
import ru from "./locales/ru"
import {deviceStorage} from "./storage/storage"


const getSelectedLanguage = async () => {
  try {
		return deviceStorage.getItem("selectedLanguage")
	} catch (error) {
		console.error("Error retrieving selected language:", error)
		return null
	}
};
export const resources = {
  en: en,
  ru: ru,
} as const;
getSelectedLanguage().then(selectedLanguage => {
  const initialLanguage = selectedLanguage || locale;

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    lng: initialLanguage,
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
    react: { useSuspense: false },
    interpolation: {
      escapeValue: false
    }
  });
});

export default i18n;
