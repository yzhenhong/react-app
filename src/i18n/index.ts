/*
 * @Author: yangzhenhong
 * @Date: 2025-07-31 09:45:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 09:48:32
 * @FilePath: \react-app\src\i18n\index.ts
 * @Description:
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入语言包
import en from './locales/en.json';
import zh from './locales/zh.json';

// 语言包配置
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

// i18n 配置
i18n.use(initReactI18next).init({
  resources,
  lng: 'zh', // 默认语言
  fallbackLng: 'en', // 回退语言
  interpolation: {
    escapeValue: false, // React 已经转义了，所以不需要
  },
  // 调试模式
  debug: process.env.NODE_ENV === 'development',
});

export default i18n;
