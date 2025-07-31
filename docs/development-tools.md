# 开发工具配置

本文档介绍了项目开发环境的配置和推荐工具，帮助开发者提高开发效率。

## 🔧 VS Code 配置

项目包含完整的 VS Code 工作区配置，提供开箱即用的开发体验。

### 工作区设置

项目根目录包含 `.vscode/settings.json` 文件，配置了以下设置：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### 推荐扩展

项目包含 `.vscode/extensions.json` 文件，自动推荐安装以下扩展：

#### 代码质量
- **ESLint** - JavaScript 代码质量检查
- **Prettier - Code formatter** - 代码格式化工具

#### TypeScript 支持
- **TypeScript Importer** - TypeScript 导入助手
- **TypeScript Hero** - TypeScript 代码组织工具

#### React 开发
- **ES7+ React/Redux/React-Native snippets** - React 代码片段
- **Auto Rename Tag** - 自动重命名标签
- **Bracket Pair Colorizer** - 括号配对着色

#### 开发效率
- **Path Intellisense** - 路径智能提示
- **GitLens** - Git 增强功能
- **Thunder Client** - API 测试工具

#### 主题和图标
- **Material Icon Theme** - 文件图标主题
- **One Dark Pro** - 代码主题

## 🛠️ 开发脚本

### 基础开发命令

```bash
# 启动开发服务器
npm start
npm run dev

# 构建生产版本
npm run build

# 弹出配置（不可逆）
npm run eject
```

### 代码质量检查

```bash
# ESLint 检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# Prettier 格式化
npm run format

# Prettier 格式检查
npm run format:check

# 同时运行 ESLint 和 Prettier 检查
npm run code:check

# 同时运行 ESLint 自动修复和 Prettier 格式化
npm run code:fix
```

### 类型检查

```bash
# TypeScript 类型检查
npx tsc --noEmit

# 类型检查并生成报告
npx tsc --noEmit --pretty
```

## 📦 依赖管理

### 核心依赖

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.0.0",
  "antd": "^5.0.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.0.0",
  "react-i18next": "^13.0.0",
  "i18next": "^23.0.0"
}
```

### 开发依赖

```json
{
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "eslint": "^8.0.0",
  "eslint-plugin-react": "^7.0.0",
  "eslint-plugin-react-hooks": "^4.0.0",
  "prettier": "^3.0.0",
  "craco": "^0.0.3"
}
```

## 🔍 调试配置

### Chrome DevTools

项目支持 Chrome DevTools 调试：

1. 安装 React Developer Tools 扩展
2. 在浏览器中打开开发者工具
3. 使用 Components 和 Profiler 标签页调试 React 组件

### VS Code 调试

项目包含 `.vscode/launch.json` 调试配置：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    },
    {
      "name": "Attach to Chrome",
      "type": "chrome",
      "request": "attach",
      "port": 9222,
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## 📊 性能监控

### Web Vitals

项目集成了 Web Vitals 监控：

```typescript
// src/reportWebVitals.ts
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
```

### 性能指标

- **CLS (Cumulative Layout Shift)** - 累积布局偏移
- **FID (First Input Delay)** - 首次输入延迟
- **FCP (First Contentful Paint)** - 首次内容绘制
- **LCP (Largest Contentful Paint)** - 最大内容绘制
- **TTFB (Time to First Byte)** - 首字节时间

## 🔒 安全配置

### 环境变量

项目使用环境变量管理敏感配置：

```bash
# .env.local
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ENV=development
```

### 安全最佳实践

1. **环境变量**
   - 敏感信息使用环境变量
   - 不要提交 `.env.local` 文件到版本控制
   - 使用 `REACT_APP_` 前缀

2. **依赖安全**
   - 定期更新依赖包
   - 使用 `npm audit` 检查安全漏洞
   - 使用 `npm audit fix` 自动修复

3. **代码安全**
   - 避免使用 `dangerouslySetInnerHTML`
   - 验证用户输入
   - 使用 HTTPS

## 🧪 测试配置

### 测试框架

项目使用 Jest 和 React Testing Library：

```bash
# 运行测试
npm test

# 运行测试并生成覆盖率报告
npm test -- --coverage

# 运行特定测试文件
npm test -- --testPathPattern=Button.test.tsx
```

### 测试示例

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📱 移动端开发

### 响应式设计

项目支持移动端开发：

```less
// 移动端断点
@mobile: 768px;
@tablet: 1024px;
@desktop: 1200px;

.responsive-component {
  // 移动端样式
  @media (max-width: @mobile) {
    padding: 10px;
  }

  // 平板样式
  @media (min-width: @mobile) and (max-width: @tablet) {
    padding: 20px;
  }

  // 桌面样式
  @media (min-width: @tablet) {
    padding: 30px;
  }
}
```

## 🚀 部署配置

### 构建优化

```bash
# 分析构建包大小
npm run build --analyze

# 生成生产构建
npm run build
```

### 部署平台

项目支持多种部署平台：

1. **Vercel**
   - 自动部署
   - 环境变量配置
   - 自定义域名

2. **Netlify**
   - 拖拽部署
   - 表单处理
   - 重定向配置

3. **GitHub Pages**
   - 静态文件托管
   - 自动构建
   - 自定义域名

## 📚 学习资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Ant Design 官方文档](https://ant.design/docs/react/introduce)

### 社区资源
- [React 社区](https://reactjs.org/community/support.html)
- [TypeScript 社区](https://www.typescriptlang.org/community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react)

### 视频教程
- [React 官方教程](https://react.dev/learn)
- [TypeScript 入门](https://www.typescriptlang.org/docs/handbook/intro.html)

## 🆘 常见问题

### Q: 如何解决 ESLint 错误？
A: 运行 `npm run lint:fix` 自动修复大部分问题，或查看错误信息手动修复。

### Q: 如何添加新的依赖？
A: 使用 `npm install package-name` 安装生产依赖，使用 `npm install -D package-name` 安装开发依赖。

### Q: 如何配置代理？
A: 在 `package.json` 中添加 `"proxy": "http://localhost:3001"` 配置开发代理。

### Q: 如何优化构建性能？
A: 使用代码分割、懒加载、Tree Shaking 等技术优化构建性能。

### Q: 如何调试生产环境问题？
A: 使用 Source Maps、错误监控工具、性能监控工具等调试生产环境问题。
