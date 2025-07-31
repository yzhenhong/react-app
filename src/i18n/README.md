# 简化的多语言模块化配置

本项目使用简化的模块化多语言配置，将语言包按功能模块进行划分，便于维护和扩展。

## 📁 目录结构

```
src/i18n/
├── index.ts              # 主配置文件（整合所有功能）
├── README.md            # 说明文档
└── locales/             # 语言包目录
    ├── en/              # 英文语言包
    │   └── language.json # 语言相关文本
    └── zh/              # 中文语言包
        └── language.json # 语言相关文本
```

## 🎯 模块说明

### 1. **common.json** - 通用文本
包含整个应用通用的文本，如按钮、状态、操作等。

```json
{
  "welcome": "欢迎",
  "login": "登录",
  "submit": "提交",
  "cancel": "取消"
}
```

### 2. **nav.json** - 导航文本
包含导航栏、菜单等导航相关的文本。

```json
{
  "home": "首页",
  "about": "关于",
  "news": "新闻"
}
```

### 3. **pages.json** - 页面文本
包含各个页面的标题、描述、表单等文本。

```json
{
  "welcome": {
    "title": "欢迎来到我们的应用",
    "subtitle": "这是一个现代化的 React 应用"
  },
  "login": {
    "title": "登录页面",
    "username": "用户名"
  }
}
```

### 4. **layout.json** - 布局文本
包含布局组件相关的文本。

```json
{
  "header": "页面头部",
  "footer": "页面底部",
  "sidebar": "侧边栏"
}
```

### 5. **demo.json** - 演示文本
包含演示页面相关的文本。

```json
{
  "router": {
    "title": "路由演示",
    "description": "React Router 使用示例"
  }
}
```

### 6. **language.json** - 语言相关文本
包含语言切换、语言名称等文本。

```json
{
  "zh": "中文",
  "en": "English",
  "switchLanguage": "切换语言"
}
```

## 🚀 使用方法

### 1. **在组件中使用**

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pages.welcome.title')}</h1>
      <p>{t('common.welcome')}</p>
      <button>{t('common.submit')}</button>
    </div>
  );
};
```

### 2. **切换语言**

```typescript
import { useLanguage } from '@/i18n';

const MyComponent: React.FC = () => {
  const { changeLanguage } = useLanguage();

  // 切换到中文
  await changeLanguage('zh');

  // 切换到英文
  await changeLanguage('en');
};
```

### 3. **使用语言管理器**

```typescript
import { languageManager } from '@/i18n';

// 切换语言
await languageManager.changeLanguage('zh');

// 重置语言设置
languageManager.resetLanguage();

// 获取当前语言
const currentLang = languageManager.getCurrentLanguage();
```

### 4. **添加新的语言模块**

1. 在 `locales/zh/` 和 `locales/en/` 目录下创建新的 JSON 文件
2. 在 `index.ts` 中导入新的模块并合并到语言包中

### 5. **添加新的语言**

1. 在 `locales/` 目录下创建新的语言文件夹（如 `ja/`）
2. 复制所有模块的 JSON 文件并翻译
3. 在 `index.ts` 中添加新语言支持

## 🔧 配置选项

### 默认配置
- **默认语言**: 中文 (`zh`)
- **回退语言**: 英文 (`en`)
- **调试模式**: 开发环境启用
- **插值**: 支持变量插值
- **持久化**: 自动保存语言选择到 localStorage

### 自定义配置

```typescript
// 在 index.ts 中修改配置
i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),    // 使用存储的语言设置
  fallbackLng: 'en',           // 回退语言
  interpolation: {
    escapeValue: false,         // React 已经转义了
  },
  debug: process.env.NODE_ENV === 'development',
});
```

## 📝 最佳实践

1. **模块化**: 按功能模块组织语言包
2. **命名规范**: 使用有意义的键名，支持嵌套结构
3. **类型安全**: 使用 TypeScript 确保类型安全
4. **持久化**: 自动保存用户语言选择
5. **错误处理**: 提供回退机制和错误处理
6. **性能优化**: 预加载所有语言包

## 🐛 常见问题

### Q: 如何添加新的语言？
A: 参考"添加新的语言"部分，创建新的语言文件夹和翻译文件。

### Q: 如何添加新的模块？
A: 参考"添加新的语言模块"部分，创建新的 JSON 文件并更新配置。

### Q: 如何处理缺失的翻译？
A: 系统会自动使用回退语言（英文）的翻译，确保英文翻译完整。

### Q: 语言选择会保存吗？
A: 是的，语言选择会自动保存到 localStorage，刷新页面后不会丢失。

### Q: 如何重置语言设置？
A: 使用 `languageManager.resetLanguage()` 或 `useLanguage` Hook 中的 `resetLanguage` 方法。

## 🎉 简化优势

### 之前的问题
- ❌ 4个文件，结构复杂
- ❌ 重复导入语言包
- ❌ 功能分散，维护困难
- ❌ 类型定义重复

### 现在的优势
- ✅ 1个主文件，结构清晰
- ✅ 统一导入，无重复代码
- ✅ 功能集中，易于维护
- ✅ 类型统一，避免重复
- ✅ 保持所有功能完整
