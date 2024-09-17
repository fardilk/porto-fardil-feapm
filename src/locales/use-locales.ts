import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { allLangs } from './all-langs';
import { fallbackLng } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find((lang) => lang.value === i18n.resolvedLanguage);

  const onChangeLang = useCallback(
    async (newLang: LanguageValue) => {
      try {
        i18n.changeLanguage(newLang);

        // const currentMessages = messages[newLang] || messages.en;

        // toast.promise(langChangePromise, {
        //   loading: currentMessages.loading,
        //   success: () => currentMessages.success,
        //   error: currentMessages.error,
        // });

        if (currentLang) {
          dayjs.locale(currentLang.adapterLocale);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [currentLang, i18n]
  );

  // Function to dynamically add translations fetched from backend
  const addBackendTranslations = useCallback(
    (translations: Record<string, Record<string, string>>) => {
      Object.keys(translations).forEach((key) => {
        // Assuming each key holds language-based values like {id: "Kode Booking", en: "Booking Code"}
        Object.keys(translations[key]).forEach((lang) => {
          i18n.addResource(lang, ns || 'translation', key, translations[key][lang]);
        });
      });
    },
    [i18n, ns]
  );

  return {
    t,
    i18n,
    onChangeLang,
    addBackendTranslations,
    currentLang: currentLang ?? fallback,
  };
}
