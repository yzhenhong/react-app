/*
 * @Author: yangzhenhong
 * @Date: 2025-07-31 09:45:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 13:16:11
 * @FilePath: \react-app\src\i18n\index.ts
 * @Description: 简化的多语言配置 - 整合所有功能
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from 'react';

// 支持的语言类型
export type SupportedLanguage = 'zh' | 'en';

// 导入模块化语言包
import enCommon from './en/common.json';
import enNav from './en/nav.json';
import enPages from './en/pages.json';
import enLayout from './en/layout.json';
import enDemo from './en/demo.json';
import enLanguage from './en/language.json';

import zhCommon from './zh/common.json';
import zhNav from './zh/nav.json';
import zhPages from './zh/pages.json';
import zhLayout from './zh/layout.json';
import zhDemo from './zh/demo.json';
import zhLanguage from './zh/language.json';

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
  en: { translation: en },
  zh: { translation: zh },
};

// 语言存储键名
const LANGUAGE_STORAGE_KEY = 'i18n-language';

// 默认语言
const DEFAULT_LANGUAGE: SupportedLanguage = 'zh';

// 支持的语言列表
const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['zh', 'en'];

/**
 * 获取存储的语言设置
 */
export const getStoredLanguage = (): SupportedLanguage => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored && SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)
      ? (stored as SupportedLanguage)
      : DEFAULT_LANGUAGE;
  } catch (error) {
    console.warn('Failed to get stored language:', error);
    return DEFAULT_LANGUAGE;
  }
};

/**
 * 保存语言设置
 */
export const saveLanguage = (language: SupportedLanguage): void => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn('Failed to save language:', error);
  }
};

/**
 * 切换语言
 */
export const changeLanguage = async (
  language: SupportedLanguage
): Promise<void> => {
  try {
    await i18n.changeLanguage(language);
    saveLanguage(language);
    console.log(`Language changed to: ${language}`);
  } catch (error) {
    console.error(`Failed to change language: ${language}`, error);
    throw error;
  }
};

/**
 * 获取当前语言
 */
export const getCurrentLanguage = (): SupportedLanguage => {
  return i18n.language as SupportedLanguage;
};

/**
 * 获取支持的语言列表
 */
export const getSupportedLanguages = (): SupportedLanguage[] => {
  return SUPPORTED_LANGUAGES;
};

/**
 * 重置语言设置
 */
export const resetLanguage = (): void => {
  try {
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    i18n.changeLanguage(DEFAULT_LANGUAGE);
    console.log(`Language reset to default: ${DEFAULT_LANGUAGE}`);
  } catch (error) {
    console.error('Failed to reset language:', error);
  }
};

// i18n 配置
i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === 'development',
});

/**
 * 语言切换 Hook - 提供加载状态管理
 */
export const useLanguageChange = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const changeLanguageWithLoading = async (language: SupportedLanguage) => {
    setIsLoading(true);
    try {
      await changeLanguage(language);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    changeLanguage: changeLanguageWithLoading,
  };
};

export default i18n;
