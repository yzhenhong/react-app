# React App - 现代化React应用

这是一个基于 Create React App 构建的现代化 React 应用，集成了 TypeScript、ESLint、Prettier 等开发工具，提供了完整的开发环境配置。

## 🚀 项目特性

- ⚛️ **React 19** - 最新版本的 React 框架
- 🔷 **TypeScript** - 类型安全的 JavaScript 超集
- 🎨 **Ant Design** - 企业级 UI 设计语言和 React 组件库
- 🔧 **ESLint** - 代码质量检查和规范
- 💅 **Prettier** - 代码格式化工具
- ⚡ **CRACO** - Create React App 配置覆盖工具
- 🛣️ **React Router** - 单页面应用路由管理（支持懒加载）
- 🎨 **Less** - CSS 预处理器支持
- 🌐 **i18n** - 国际化支持
- 📡 **Axios** - HTTP 客户端（已优化API响应类型处理）
- 🗃️ **Redux Toolkit** - 状态管理

## 📋 目录结构

```
react-app/
├── public/                 # 静态资源目录
├── src/                    # 源代码目录
│   ├── components/         # React 组件
│   ├── pages/             # 页面组件
│   ├── api/               # API 接口（已优化类型处理）
│   ├── i18n/              # 国际化配置
│   ├── utils/             # 工具函数
│   ├── assets/            # 资源文件
│   ├── layout/            # 布局组件
│   ├── router/            # 路由配置
│   └── store/             # 状态管理
├── docs/                  # 项目文档
├── .eslintrc.js           # ESLint 配置
├── .prettierrc            # Prettier 配置
├── craco.config.ts        # CRACO 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖
```

## 🛠️ 开发环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

## 📦 安装和运行

### 1. 克隆项目

```bash
git clone <repository-url>
cd react-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm start
# 或者
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

## 📜 可用脚本

### 开发相关

```bash
npm start          # 启动开发服务器
npm run dev        # 启动开发服务器（别名）
npm run build      # 构建生产版本
npm run eject      # 弹出配置（不可逆）
```

### 代码质量相关

```bash
npm run lint              # 检查代码质量和潜在问题
npm run lint:fix          # 检查代码质量并自动修复可修复的问题
npm run format            # 使用 Prettier 格式化所有代码文件
npm run format:check      # 检查代码格式是否符合 Prettier 规范
npm run code:check        # 同时运行 ESLint 检查和 Prettier 格式检查
npm run code:fix          # 同时运行 ESLint 自动修复和 Prettier 格式化
```

## 🔧 配置说明

### ESLint 配置

项目使用 ESLint 进行代码质量检查，配置文件为 `.eslintrc.js`。

**主要特性：**
- TypeScript 严格模式检查
- React Hooks 规则检查
- 可访问性 (a11y) 规则检查
- 代码质量最佳实践

### Prettier 配置

项目使用 Prettier 进行代码格式化，配置文件为 `.prettierrc`。

**格式化规则：**
- 使用分号结尾
- 使用单引号
- 行宽限制为 80 字符
- 缩进使用 2 个空格

### CRACO 配置

项目使用 CRACO 来覆盖 Create React App 的默认配置，配置文件为 `craco.config.ts`。

**主要功能：**
- 配置路径别名 `@` 指向 `src` 目录
- 集成 ESLint 配置
- Less 样式预处理器支持

## 📚 详细文档

更多详细的使用指南和配置说明，请查看 `docs/` 目录下的相关文档：

- [API 使用指南](docs/api/README.md) - Axios HTTP 客户端配置和使用（包含类型处理优化说明）
- [国际化配置](docs/i18n/README.md) - 多语言支持和配置
- [路由系统](docs/router/README.md) - React Router 路由管理
- [代码规范](docs/coding-standards.md) - 代码编写规范和最佳实践
- [开发工具](docs/development-tools.md) - 开发工具配置和使用

## 🆘 常见问题

### Q: 如何禁用某些 ESLint 规则？
A: 在 `.eslintrc.js` 文件的 `rules` 部分修改或添加规则。

### Q: 如何自定义 Prettier 格式化规则？
A: 修改 `.prettierrc` 文件中的配置项。

### Q: 如何添加新的路径别名？
A: 在 `craco.config.ts` 文件的 `webpack.alias` 部分添加新的别名。

### Q: 路由配置中应该使用 JSX 语法还是 React.createElement？
A: 推荐使用 JSX 语法（如 `<Component />`），因为它更简洁、更符合 React 惯例，且 TypeScript 支持更好。

### Q: 如何实现类似 Vue Router 的懒加载？
A: 项目已内置 `lazyLoad` 工具函数，可以直接使用 `element: lazyLoad(() => import('@/pages/component'))` 实现懒加载，语法类似 Vue Router。该实现无加载状态显示，刷新页面时不会出现"页面加载中..."提示。

### Q: 如何创建新的 API 模块？
A: 详细说明请参考 [API 使用指南](docs/api/README.md)，其中包含了完整的类型处理优化说明和使用方法。

## 📦 构建和部署

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

### 部署

构建完成后，可以将 `build/` 目录部署到任何静态文件服务器。

---

**Happy Coding! 🎉**
