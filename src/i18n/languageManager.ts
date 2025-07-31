/*
 * @Author: yangzhenhong
 * @Date: 2025-07-31 09:52:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 09:52:00
 * @FilePath: \react-app\src\i18n\languageManager.ts
 * @Description: 语言包管理工具
 */

import i18n from 'i18next';
import { loadLanguageModules, SupportedLanguage } from './languageLoader';

/**
 * 语言包管理器
 */
export class LanguageManager {
  private static instance: LanguageManager;
  private loadedLanguages: Set<SupportedLanguage> = new Set();

  private constructor() {
    // 私有构造函数，防止外部实例化
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }

  /**
   * 加载语言包
   * @param language 语言代码
   */
  public async loadLanguage(language: SupportedLanguage): Promise<void> {
    if (this.loadedLanguages.has(language)) {
      return; // 已经加载过了
    }

    try {
      const modules = await loadLanguageModules(language);

      // 合并到 i18n 资源中
      const existingResources = i18n.options.resources || {};
      const languageResources = existingResources[language] || {
        translation: {},
      };

      // 合并模块
      const existingTranslation =
        (languageResources.translation as Record<string, any>) || {};
      const mergedTranslation = {
        ...existingTranslation,
        ...(modules as Record<string, any>),
      };
      languageResources.translation = mergedTranslation;

      // 更新 i18n 资源
      i18n.addResourceBundle(
        language,
        'translation',
        languageResources.translation,
        true,
        true
      );

      this.loadedLanguages.add(language);
      console.log(`Language loaded: ${language}`);
    } catch (error) {
      console.error(`Failed to load language: ${language}`, error);
      throw error;
    }
  }

  /**
   * 切换语言
   * @param language 语言代码
   */
  public async changeLanguage(language: SupportedLanguage): Promise<void> {
    try {
      // 确保语言包已加载
      await this.loadLanguage(language);

      // 切换语言
      await i18n.changeLanguage(language);

      console.log(`Language changed to: ${language}`);
    } catch (error) {
      console.error(`Failed to change language: ${language}`, error);
      throw error;
    }
  }

  /**
   * 获取已加载的语言列表
   */
  public getLoadedLanguages(): SupportedLanguage[] {
    return Array.from(this.loadedLanguages);
  }

  /**
   * 检查语言是否已加载
   * @param language 语言代码
   */
  public isLanguageLoaded(language: SupportedLanguage): boolean {
    return this.loadedLanguages.has(language);
  }

  /**
   * 获取当前语言
   */
  public getCurrentLanguage(): string {
    return i18n.language;
  }

  /**
   * 获取支持的语言列表
   */
  public getSupportedLanguages(): SupportedLanguage[] {
    return ['zh', 'en'];
  }
}

// 导出单例实例
export const languageManager = LanguageManager.getInstance();
