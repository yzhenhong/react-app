/*
 * @Author: yangzhenhong
 * @Date: 2025-07-31 10:15:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 10:15:00
 * @FilePath: \react-app\src\i18n\useLanguage.ts
 * @Description: 语言持久化 Hook
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languageManager, SupportedLanguage } from './languageManager';

/**
 * 语言持久化 Hook
 * 提供语言切换功能，自动处理持久化存储
 */
export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage>('zh');
  const [isLoading, setIsLoading] = useState(false);

  // 初始化时获取当前语言
  useEffect(() => {
    const storedLanguage = languageManager.getStoredLanguageSetting();
    setCurrentLanguage(storedLanguage);
  }, []);

  // 监听语言变化
  useEffect(() => {
    const handleLanguageChange = (language: string) => {
      setCurrentLanguage(language as SupportedLanguage);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  /**
   * 切换语言
   * @param language 目标语言
   */
  const changeLanguage = async (language: SupportedLanguage) => {
    setIsLoading(true);
    try {
      await languageManager.changeLanguage(language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 重置语言设置
   */
  const resetLanguage = () => {
    languageManager.resetLanguage();
    setCurrentLanguage('zh');
  };

  /**
   * 获取支持的语言列表
   */
  const getSupportedLanguages = (): SupportedLanguage[] => {
    return languageManager.getSupportedLanguages();
  };

  /**
   * 检查语言是否已加载
   */
  const isLanguageLoaded = (language: SupportedLanguage): boolean => {
    return languageManager.isLanguageLoaded(language);
  };

  return {
    currentLanguage,
    isLoading,
    changeLanguage,
    resetLanguage,
    getSupportedLanguages,
    isLanguageLoaded,
  };
};
