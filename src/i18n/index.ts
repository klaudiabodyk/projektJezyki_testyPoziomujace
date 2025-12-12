import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import pl from './locales/pl.json'

const resources = {
  pl: { translation: pl },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'pl',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })

export default i18n

