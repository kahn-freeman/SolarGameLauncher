// src/i18n/i18n.ts
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en/translation';
import jaTranslation from '../locales/jp/translation';
import zhTranslation from '../locales/zh/translation';
// 类型声明扩展
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enTranslation;
    };
  }
}
type Resources = {
  en: typeof enTranslation;
  zh: typeof zhTranslation;
  ja: typeof jaTranslation;
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<Resources>({
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation },
      ja: { translation: jaTranslation } // ✅ 修正语言代码
    },
    lng: 'en', // 初始语言
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh', 'ja'], // ✅ 明确声明支持的语言
    debug: false,
    interpolation: {
      escapeValue: false
    },
    // 新增安全配置
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'], // ✅ 明确检测顺序
      caches: ['cookie'], // ✅ 仅用 cookie 存储
      lookupQuerystring: 'lang', // 自定义查询参数
    },
    react: {
      useSuspense: true // ✅ 启用 React Suspense
    }
  });

export default i18n;