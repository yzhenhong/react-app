# 多语言模块化配置

本项目使用模块化的多语言配置，将语言包按功能模块进行划分，便于维护和扩展。

## 📁 目录结构

```
src/i18n/
├── index.ts              # i18n 主配置文件
├── languageLoader.ts     # 动态语言包加载器
├── languageManager.ts    # 语言包管理器
├── README.md            # 说明文档
└── locales/             # 语言包目录
    ├── en/              # 英文语言包
    │   ├── **.json       # 语言文本
    │   └── language.json # 语言相关文本
    └── zh/              # 中文语言包
        ├── **.json       # 语言文本
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
import { languageManager } from '@/i18n/languageManager';

// 切换到中文
await languageManager.changeLanguage('zh');

// 切换到英文
await languageManager.changeLanguage('en');
```

### 3. **添加新的语言模块**

1. 在 `locales/zh/` 和 `locales/en/` 目录下创建新的 JSON 文件
2. 在 `languageLoader.ts` 中的 `languageModules` 数组中添加模块名
3. 在 `index.ts` 中导入新的模块并合并到语言包中

### 4. **添加新的语言**

1. 在 `locales/` 目录下创建新的语言文件夹（如 `ja/`）
2. 复制所有模块的 JSON 文件并翻译
3. 在 `languageLoader.ts` 和 `languageManager.ts` 中添加新语言支持

## 🔧 配置选项

### 默认配置
- **默认语言**: 中文 (`zh`)
- **回退语言**: 英文 (`en`)
- **调试模式**: 开发环境启用
- **插值**: 支持变量插值

### 自定义配置

```typescript
// 在 index.ts 中修改配置
i18n.use(initReactI18next).init({
  resources,
  lng: 'zh',           // 默认语言
  fallbackLng: 'en',   // 回退语言
  interpolation: {
    escapeValue: false, // React 已经转义了
  },
  debug: process.env.NODE_ENV === 'development',
});
```

## 📝 最佳实践

1. **模块化**: 按功能模块组织语言包
2. **命名规范**: 使用有意义的键名，支持嵌套结构
3. **类型安全**: 使用 TypeScript 确保类型安全
4. **动态加载**: 支持按需加载语言包
5. **错误处理**: 提供回退机制和错误处理
6. **性能优化**: 避免重复加载已加载的语言包

## 🐛 常见问题

### Q: 如何添加新的语言？
A: 参考"添加新的语言"部分，创建新的语言文件夹和翻译文件。

### Q: 如何添加新的模块？
A: 参考"添加新的语言模块"部分，创建新的 JSON 文件并更新配置。

### Q: 如何处理缺失的翻译？
A: 系统会自动使用回退语言（英文）的翻译，确保英文翻译完整。

### Q: 如何优化加载性能？
A: 使用 `languageManager` 的预加载功能，或实现按需加载策略。
