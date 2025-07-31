/*
 * @Author: yangzhenhong
 * @Date: 2025-07-31 09:45:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 09:48:32
 * @FilePath: \react-app\src\i18n\index.ts
 * @Description: 模块化多语言配置
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入模块化语言包
import enCommon from './locales/en/common.json';
import enNav from './locales/en/nav.json';
import enPages from './locales/en/pages.json';
import enLayout from './locales/en/layout.json';
import enDemo from './locales/en/demo.json';
import enLanguage from './locales/en/language.json';

import zhCommon from './locales/zh/common.json';
import zhNav from './locales/zh/nav.json';
import zhPages from './locales/zh/pages.json';
import zhLayout from './locales/zh/layout.json';
import zhDemo from './locales/zh/demo.json';
import zhLanguage from './locales/zh/language.json';

// 合并语言包
const en = {
  common: enCommon,
  nav: enNav,
  pages: enPages,
  layout: enLayout,
  demo: enDemo,
  language: enLanguage,
};

const zh = {
  common: zhCommon,
  nav: zhNav,
  pages: zhPages,
  layout: zhLayout,
  demo: zhDemo,
  language: zhLanguage,
};

// 语言包配置
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

// 获取存储的语言设置
const getStoredLanguage = (): string => {
  try {
    const stored = localStorage.getItem('i18n-language');
    return stored && ['zh', 'en'].includes(stored) ? stored : 'zh';
  } catch (error) {
    console.warn('Failed to get stored language:', error);
    return 'zh';
  }
};

// 保存语言设置
const saveLanguage = (language: string): void => {
  try {
    localStorage.setItem('i18n-language', language);
  } catch (error) {
    console.warn('Failed to save language:', error);
  }
};

// i18n 配置
i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(), // 使用存储的语言设置
  fallbackLng: 'en', // 回退语言
  interpolation: {
    escapeValue: false, // React 已经转义了，所以不需要
  },
  // 调试模式
  debug: process.env.NODE_ENV === 'development',
});

// 监听语言变化，自动保存到 localStorage
i18n.on('languageChanged', language => {
  saveLanguage(language);
});

export default i18n;
