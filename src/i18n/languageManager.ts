/*
 * @Author: yangzhenhong
 * @Date: 2025-07-31 09:52:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 09:52:00
 * @FilePath: \react-app\src\i18n\languageManager.ts
 * @Description: 语言包管理工具
 */

import i18n from 'i18next';
import { loadLanguageModules } from './languageLoader';

// 支持的语言类型
export type SupportedLanguage = 'zh' | 'en';

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
   * 获取存储的语言设置
   */
  private getStoredLanguage(): SupportedLanguage {
    try {
      const stored = localStorage.getItem('i18n-language');
      return (
        stored && ['zh', 'en'].includes(stored) ? stored : 'zh'
      ) as SupportedLanguage;
    } catch (error) {
      console.warn('Failed to get stored language:', error);
      return 'zh';
    }
  }

  /**
   * 保存语言设置
   */
  private saveLanguage(language: SupportedLanguage): void {
    try {
      localStorage.setItem('i18n-language', language);
    } catch (error) {
      console.warn('Failed to save language:', error);
    }
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

      // 保存到本地存储
      this.saveLanguage(language);

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
   * 获取存储的语言设置
   */
  public getStoredLanguageSetting(): SupportedLanguage {
    return this.getStoredLanguage();
  }

  /**
   * 获取支持的语言列表
   */
  public getSupportedLanguages(): SupportedLanguage[] {
    return ['zh', 'en'];
  }

  /**
   * 重置语言设置（恢复到默认语言）
   */
  public resetLanguage(): void {
    try {
      localStorage.removeItem('i18n-language');
      i18n.changeLanguage('zh');
      console.log('Language reset to default: zh');
    } catch (error) {
      console.error('Failed to reset language:', error);
    }
  }
}

// 导出单例实例
export const languageManager = LanguageManager.getInstance();
