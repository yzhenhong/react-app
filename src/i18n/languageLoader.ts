/*
 * @Author: yangzhenhong
 * @Date: 2025-07-31 09:50:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 10:55:40
 * @FilePath: \react-app\src\i18n\languageLoader.ts
 * @Description: 动态语言包加载器
 */

// 语言包模块类型
export interface LanguageModules {
  common: any;
  nav: any;
  pages: any;
  layout: any;
  demo: any;
  language: any;
}

// 支持的语言（从 languageManager 导入）
export type SupportedLanguage = 'zh' | 'en';

// 语言包模块列表
const languageModules = [
  'common',
  'nav',
  'pages',
  'layout',
  'demo',
  'language',
] as const;

/**
 * 动态加载语言包
 * @param language 语言代码
 * @returns Promise<LanguageModules>
 */
export const loadLanguageModules = async (
  language: SupportedLanguage
): Promise<LanguageModules> => {
  const modules: Partial<LanguageModules> = {};

  // 动态导入所有模块
  const modulePromises = languageModules.map(async moduleName => {
    try {
      const module = await import(`./locales/${language}/${moduleName}.json`);
      modules[moduleName] = module.default;
    } catch (error) {
      console.warn(
        `Failed to load language module: ${language}/${moduleName}`,
        error
      );
      // 如果加载失败，使用空对象作为默认值
      modules[moduleName] = {};
    }
  });

  await Promise.all(modulePromises);

  return modules as LanguageModules;
};

/**
 * 预加载所有语言包
 * @returns Promise<void>
 */
export const preloadAllLanguages = async (): Promise<void> => {
  const languages: SupportedLanguage[] = ['zh', 'en'];

  const preloadPromises = languages.map(async language => {
    try {
      await loadLanguageModules(language);
      console.log(`Preloaded language: ${language}`);
    } catch (error) {
      console.error(`Failed to preload language: ${language}`, error);
    }
  });

  await Promise.all(preloadPromises);
};

/**
 * 获取语言包模块列表
 * @returns 模块名称数组
 */
export const getLanguageModules = (): readonly string[] => {
  return languageModules;
};
