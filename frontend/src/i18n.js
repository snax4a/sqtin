import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';

i18n
  .use(detector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,

    fallbackLng: 'GB',
    whitelist: ['GB', 'PL'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
