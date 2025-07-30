# React App - 现代化React应用

这是一个基于 Create React App 构建的现代化 React 应用，集成了 TypeScript、ESLint、Prettier 等开发工具，提供了完整的开发环境配置。

## 🚀 项目特性

- ⚛️ **React 19** - 最新版本的 React 框架
- 🔷 **TypeScript** - 类型安全的 JavaScript 超集
- 🎨 **Ant Design** - 企业级 UI 设计语言和 React 组件库
- 🔧 **ESLint** - 代码质量检查和规范
- 💅 **Prettier** - 代码格式化工具
- ⚡ **CRACO** - Create React App 配置覆盖工具
- 🛣️ **React Router** - 单页面应用路由管理
- 📦 **路径别名** - 支持 `@` 路径别名
- 🎨 **Less** - CSS 预处理器支持

## 📋 目录结构

```
react-app/
├── public/                 # 静态资源目录
├── src/                    # 源代码目录
│   ├── components/         # React 组件
│   ├── pages/             # 页面组件
│   ├── api/               # API 接口
│   ├── utils/             # 工具函数
│   ├── assets/            # 资源文件
│   └── ...
├── .eslintrc.js           # ESLint 配置
├── .prettierrc            # Prettier 配置
├── .prettierignore        # Prettier 忽略文件
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

**规则配置：**
- 禁止未使用的变量（以 `_` 开头的参数除外）
- 警告使用 `any` 类型
- 关闭函数返回类型强制声明
- 关闭模块边界类型强制声明
- 警告非空断言操作符
- React 17+ 不需要导入 React
- 关闭 PropTypes 检查（使用 TypeScript）
- 警告 console 语句
- 错误 debugger 语句
- 强制使用 const 声明
- 禁止使用 var
- 强制使用对象简写
- 强制使用模板字符串

### Prettier 配置

项目使用 Prettier 进行代码格式化，配置文件为 `.prettierrc`。

**格式化规则：**
- 使用分号结尾
- 使用单引号
- 行宽限制为 80 字符
- 缩进使用 2 个空格
- 使用空格而不是制表符
- 对象和数组使用尾随逗号
- JSX 标签的 `>` 放在新行
- 箭头函数参数避免不必要的括号
- 使用 LF 行尾符
- JSX 中使用单引号

### CRACO 配置

项目使用 CRACO 来覆盖 Create React App 的默认配置，配置文件为 `craco.config.ts`。

**主要功能：**
- 配置路径别名 `@` 指向 `src` 目录
- 集成 ESLint 配置
- Jest 测试环境支持路径别名
- Less 样式预处理器支持

### Less 配置

项目支持 Less 样式预处理器，配置文件为 `craco.config.ts`。

**主要特性：**
- Less 变量和嵌套支持
- 与 Ant Design 主题集成
- 全局变量配置
- JavaScript 表达式支持



## 🎨 代码规范

### 文件命名

- 组件文件使用 PascalCase：`UserProfile.tsx`
- 工具文件使用 camelCase：`formatDate.ts`
- 常量文件使用 UPPER_SNAKE_CASE：`API_ENDPOINTS.ts`

### 组件规范

```typescript
// 组件示例
import React from 'react';
import { Button } from 'antd';

interface UserProfileProps {
  name: string;
  email: string;
  onEdit?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, onEdit }) => {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>{email}</p>
      {onEdit && <Button onClick={onEdit}>编辑</Button>}
    </div>
  );
};

export default UserProfile;
```

### 导入规范

```typescript
// 推荐的导入顺序
// 1. React 相关
import React from 'react';

// 2. 第三方库
import { Button, Input } from 'antd';
import { useQuery } from '@tanstack/react-query';

// 3. 内部模块（使用路径别名）
import { formatDate } from '@/utils/date';
import UserProfile from '@/components/UserProfile';

// 4. 样式文件
import './styles.css';
```

## 🔍 开发工具配置

### VS Code 配置

项目包含 VS Code 工作区配置：

- **自动格式化**: 保存时自动格式化代码
- **ESLint 集成**: 实时显示代码问题
- **Prettier 集成**: 统一代码风格
- **推荐扩展**: 自动提示安装必要的扩展

### 推荐的 VS Code 扩展

- **Prettier - Code formatter** - 代码格式化
- **ESLint** - 代码质量检查
- **TypeScript Importer** - TypeScript 导入助手
- **Auto Rename Tag** - 自动重命名标签
- **Path Intellisense** - 路径智能提示



## 📦 构建和部署

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

### 部署

构建完成后，可以将 `build/` 目录部署到任何静态文件服务器。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 更新日志

### v0.1.0 (2025-07-29)
- 初始化项目
- 集成 TypeScript
- 配置 ESLint 和 Prettier
- 集成 Ant Design
- 配置 CRACO
- 添加 VS Code 配置
- 移除测试相关配置（专注于核心开发功能）

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 常见问题

### Q: 如何禁用某些 ESLint 规则？
A: 在 `.eslintrc.js` 文件的 `rules` 部分修改或添加规则。

### Q: 如何自定义 Prettier 格式化规则？
A: 修改 `.prettierrc` 文件中的配置项。

### Q: 如何添加新的路径别名？
A: 在 `craco.config.ts` 文件的 `webpack.alias` 部分添加新的别名。



## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 邮箱: your-email@example.com

---

**Happy Coding! 🎉**

## 🛣️ React Router 路由系统

### 核心组件说明

项目使用 React Router v6 进行路由管理，主要包含以下核心组件：

#### 1. **BrowserRouter** - 路由器容器
- **作用**：整个路由系统的容器，使用浏览器的 History API 管理 URL
- **特点**：URL 看起来像正常的网站地址（如 `http://localhost:3000/welcome`）
- **使用场景**：必须包裹整个应用的路由系统

#### 2. **Routes** - 路由规则集合
- **作用**：包含所有路由规则的容器，相当于应用的"路线图"
- **特点**：所有的 Route 组件都必须放在 Routes 里面
- **功能**：根据当前 URL 匹配最合适的路由规则

#### 3. **Route** - 单个路由规则
- **作用**：定义具体的路由规则，指定"访问某个路径时显示哪个组件"
- **语法**：`<Route path="路径" element={<组件 />} />`
- **特点**：支持嵌套路由和动态参数

#### 4. **Navigate** - 页面重定向
- **作用**：自动跳转到指定路径，常用于默认路由和 404 处理
- **语法**：`<Navigate to="目标路径" replace />`
- **特点**：`replace` 属性会替换当前历史记录，不会留下返回痕迹

### 当前路由配置

```typescript
// src/router/index.tsx
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 默认路由重定向到欢迎页面 */}
        <Route path='/' element={<Navigate to='/welcome' replace />} />

        {/* 使用默认布局的路由组 */}
        <Route element={<LayoutDefault />}>
          {/* 欢迎页面 - 使用默认布局 */}
          <Route path='welcome' element={<Welcome />} />

          {/* 路由演示页面 - 使用默认布局 */}
          <Route path='router-demo' element={<RouterDemo />} />

          {/* 布局演示页面 - 使用默认布局 */}
          <Route path='layout-demo' element={<LayoutDemo />} />
        </Route>

        {/* 使用空白布局的路由组 */}
        <Route element={<LayoutBlank />}>
          {/* 新闻页面 - 使用空白布局 */}
          <Route path='news' element={<News />} />
        </Route>

        {/* 404 页面 - 重定向到欢迎页面 */}
        <Route path='*' element={<Navigate to='/welcome' replace />} />
      </Routes>
    </BrowserRouter>
  );
};
```

### 布局系统说明

项目实现了嵌套路由布局系统，支持不同的页面使用不同的布局：

#### 1. **默认布局 (LayoutDefault)**
- **特点**：包含导航栏和页脚的完整布局
- **适用页面**：`/welcome`, `/router-demo`, `/layout-demo`
- **样式**：浅色背景，白色内容区域，包含导航和页脚

#### 2. **空白布局 (LayoutBlank)**
- **特点**：不包含导航栏和页脚的简洁布局
- **适用页面**：`/news`
- **样式**：黑色背景，白色文字，全屏展示

#### 3. **嵌套路由工作原理**
- 使用 `Outlet` 组件渲染子路由内容
- 布局组件作为父路由，页面组件作为子路由
- 自动根据路由路径应用对应的布局样式

### 路由使用示例

#### 0. 嵌套路由演示页面
项目包含一个完整的嵌套路由演示页面，展示了不同布局的使用方法：

```bash
# 访问演示页面
http://localhost:3000/layout-demo
```

演示页面包含：
- 不同布局的说明和对比
- 页面导航示例
- 嵌套路由工作原理
- 代码示例展示

#### 1. 路由演示页面
项目包含一个完整的路由演示页面，展示了所有 React Router 组件的使用方法：

```bash
# 访问演示页面
http://localhost:3000/router-demo
```

演示页面包含：
- 当前路由信息显示
- Link 组件使用示例
- useNavigate Hook 使用示例
- 详细的路由组件说明
- 实际应用场景展示

#### 1. 基本页面导航
```typescript
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <Link to="/welcome">欢迎页面</Link>
      <Link to="/news">新闻页面</Link>
    </nav>
  );
};
```

#### 2. 编程式导航
```typescript
import { useNavigate } from 'react-router-dom';

const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 登录成功后跳转到欢迎页面
    navigate('/welcome');
  };

  return <button onClick={handleLogin}>登录</button>;
};
```

#### 3. 获取当前路由信息
```typescript
import { useLocation } from 'react-router-dom';

const CurrentPage: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      当前页面: {location.pathname}
    </div>
  );
};
```

### 路由最佳实践

1. **路由结构清晰**：按功能模块组织路由
2. **默认重定向**：为根路径设置合理的默认页面
3. **404 处理**：为不存在的路径提供友好的处理方式
4. **路由守卫**：在需要时添加权限验证
5. **懒加载**：对大型页面组件使用 React.lazy 进行代码分割
