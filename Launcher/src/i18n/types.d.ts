// src/i18n/types.d.ts
import enTranslations from '../locales/en/translation';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enTranslations;
    };
    allowObjectInHTMLChildren: true; // 允许在 HTML 元素中使用对象
  }
}

// 增强 Trans 组件类型
declare module 'react-i18next' {
  interface TransProps extends i18n.TransProps {}
}