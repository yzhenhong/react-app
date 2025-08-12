# 国际化配置指南

本项目使用 **react-i18next** 实现国际化支持，提供了完整的多语言切换和本地化功能。

## 🚀 核心特性

- **🌐 多语言支持** - 支持中英文切换
- **🔄 动态加载** - 按需加载语言包
- **📅 格式化支持** - 支持日期、数字等格式化
- **🎯 命名空间** - 模块化的语言包管理
- **⚡ 性能优化** - 懒加载和缓存机制

## 📁 目录结构

```
src/i18n/
├── index.ts              # i18n 主配置文件
└── locales/              # 语言包目录
    ├── en/               # 英文语言包
    └── zh/               # 中文语言包
```

## ⚙️ 基础配置

### i18n 主配置

在 `src/i18n/index.ts` 中配置 i18n 实例：

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言包
import enCommon from './locales/en/common.json';
import enNav from './locales/en/nav.json';
import enPages from './locales/en/pages.json';
import enDemo from './locales/en/demo.json';
import enLayout from './locales/en/layout.json';
import enLanguage from './locales/en/language.json';

import zhCommon from './locales/zh/common.json';
import zhNav from './locales/zh/nav.json';
import zhPages from './locales/zh/pages.json';
import zhDemo from './locales/zh/demo.json';
import zhLayout from './locales/zh/layout.json';
import zhLanguage from './locales/zh/language.json';

// 语言包配置
const resources = {
  en: {
    common: enCommon,
    nav: enNav,
    pages: enPages,
    demo: enDemo,
    layout: enLayout,
    language: enLanguage,
  },
  zh: {
    common: zhCommon,
    nav: zhNav,
    pages: zhPages,
    demo: zhDemo,
    layout: zhLayout,
    language: zhLanguage,
  },
};

// i18n 配置
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh', // 默认语言
    debug: process.env.NODE_ENV === 'development',

    // 命名空间配置
    ns: ['common', 'nav', 'pages', 'demo', 'layout', 'language'],
    defaultNS: 'common',

    // 插值配置
    interpolation: {
      escapeValue: false, // React 已经转义了
    },

    // 语言检测配置
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

### 语言包结构

每个语言包都是一个 JSON 文件，包含该语言下的所有文本：

```json
// src/i18n/locales/zh/common.json
{
  "submit": "提交",
  "cancel": "取消",
  "confirm": "确认",
  "delete": "删除",
  "edit": "编辑",
  "save": "保存",
  "loading": "加载中...",
  "success": "操作成功",
  "error": "操作失败",
  "warning": "警告",
  "info": "信息"
}

// src/i18n/locales/en/common.json
{
  "submit": "Submit",
  "cancel": "Cancel",
  "confirm": "Confirm",
  "delete": "Delete",
  "edit": "Edit",
  "save": "Save",
  "loading": "Loading...",
  "success": "Operation successful",
  "error": "Operation failed",
  "warning": "Warning",
  "info": "Information"
}
```

## 🔧 使用方法

### 1. 基础翻译

使用 `useTranslation` Hook 进行翻译：

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('common.description')}</p>
      <button>{t('common.submit')}</button>
    </div>
  );
};
```

### 2. 命名空间使用

指定特定的命名空间：

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation('nav');

  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/about">{t('about')}</a>
      <a href="/contact">{t('contact')}</a>
    </nav>
  );
};
```

### 3. 插值使用

支持变量插值：

```typescript
const { t } = useTranslation();

// 基础插值
const message = t('common.welcomeUser', { name: '张三' });

// 复数形式
const count = t('common.itemCount', { count: 5 });

// 嵌套插值
const complex = t('common.nested', {
  user: { name: '张三', role: 'admin' }
});
```

对应的语言包：

```json
{
  "welcomeUser": "欢迎，{{name}}！",
  "itemCount_one": "{{count}} 个项目",
  "itemCount_other": "{{count}} 个项目",
  "nested": "用户 {{user.name}} 的角色是 {{user.role}}"
}
```

### 4. 语言切换

使用 `i18n.changeLanguage` 切换语言：

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('zh')}>中文</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
};
```

## 🎨 高级功能

### 1. 日期格式化

```typescript
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

const DateComponent = () => {
  const { i18n } = useTranslation();
  const date = new Date();

  const formatDate = (date: Date) => {
    const locale = i18n.language === 'zh' ? zhCN : enUS;
    return format(date, 'PPP', { locale });
  };

  return <div>{formatDate(date)}</div>;
};
```

### 2. 数字格式化

```typescript
import { useTranslation } from 'react-i18next';

const NumberComponent = () => {
  const { t } = useTranslation();
  const number = 1234.56;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(i18n.language).format(num);
  };

  return (
    <div>
      <p>{t('common.price')}: {formatNumber(number)}</p>
    </div>
  );
};
```

### 3. 复数处理

```typescript
// 语言包配置
{
  "itemCount_one": "{{count}} 个项目",
  "itemCount_other": "{{count}} 个项目"
}

// 使用
const { t } = useTranslation();
const count = 5;
const message = t('common.itemCount', { count });
```

## 🔄 动态加载

### 懒加载语言包

```typescript
// 动态导入语言包
const loadLanguage = async (lng: string) => {
  try {
    const messages = await import(`./locales/${lng}/common.json`);
    i18n.addResourceBundle(lng, 'common', messages.default, true, true);
  } catch (error) {
    console.error(`Failed to load language: ${lng}`, error);
  }
};

// 使用
const changeLanguage = async (lng: string) => {
  await loadLanguage(lng);
  i18n.changeLanguage(lng);
};
```

### 按需加载命名空间

```typescript
const loadNamespace = async (lng: string, ns: string) => {
  try {
    const messages = await import(`./locales/${lng}/${ns}.json`);
    i18n.addResourceBundle(lng, ns, messages.default, true, true);
  } catch (error) {
    console.error(`Failed to load namespace: ${ns}`, error);
  }
};
```

## 🎯 组件集成

### 1. 语言切换器组件

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const { Option } = Select;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      style={{ width: 100 }}
    >
      <Option value="zh">中文</Option>
      <Option value="en">English</Option>
    </Select>
  );
};

export default LanguageSwitcher;
```

### 2. 翻译高阶组件

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

interface WithTranslationProps {
  t: (key: string, options?: any) => string;
  i18n: any;
}

export const withTranslation = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithTranslationProps>
) => {
  return (props: P) => {
    const { t, i18n } = useTranslation();
    return <WrappedComponent {...props} t={t} i18n={i18n} />;
  };
};
```

## 📱 移动端适配

### 响应式语言包

```typescript
// 检测设备类型
const isMobile = window.innerWidth <= 768;

// 根据设备类型加载不同的语言包
const loadResponsiveLanguage = async (lng: string) => {
  const deviceType = isMobile ? 'mobile' : 'desktop';
  const messages = await import(`./locales/${lng}/${deviceType}.json`);
  i18n.addResourceBundle(lng, deviceType, messages.default, true, true);
};
```

## 🧪 测试支持

### 1. 测试环境配置

```typescript
// 测试环境配置
if (process.env.NODE_ENV === 'test') {
  i18n.init({
    resources: {
      en: { common: { test: 'Test' } },
      zh: { common: { test: '测试' } },
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
  });
}
```

### 2. 测试工具函数

```typescript
// 测试辅助函数
export const changeLanguageForTesting = (lng: string) => {
  i18n.changeLanguage(lng);
};

export const getTranslationForTesting = (key: string) => {
  return i18n.t(key);
};
```

## 📚 最佳实践

### 1. 命名规范

- 使用点号分隔的键名：`common.submit`、`nav.home`
- 按功能模块组织：`pages.login.title`、`pages.dashboard.welcome`
- 保持键名的一致性

### 2. 性能优化

- 使用懒加载减少初始包大小
- 实现语言包缓存
- 避免在渲染过程中动态加载

### 3. 维护性

- 定期检查和更新翻译
- 使用翻译管理工具
- 建立翻译审查流程

### 4. 用户体验

- 提供语言偏好记忆
- 支持自动语言检测
- 提供语言切换的视觉反馈

## 🆘 常见问题

### Q: 如何添加新的语言？
A: 在 `locales` 目录下创建新的语言文件夹，并在 `i18n/index.ts` 中注册。

### Q: 如何处理缺失的翻译？
A: 使用 `fallbackLng` 配置默认语言，或者实现自定义的缺失翻译处理逻辑。

### Q: 如何实现翻译的实时更新？
A: 可以使用 WebSocket 或轮询机制实时更新翻译内容。

### Q: 如何优化大型语言包的性能？
A: 使用代码分割和懒加载，按需加载语言包和命名空间。

## 📚 相关资源

- [react-i18next 官方文档](https://react.i18next.com/)
- [i18next 官方文档](https://www.i18next.com/)
- [国际化最佳实践](https://www.i18next.com/overview/best-practices)
- [日期格式化库 date-fns](https://date-fns.org/)

---

**Happy Internationalization! 🌐**
