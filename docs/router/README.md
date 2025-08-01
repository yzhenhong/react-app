# React Router 路由系统

项目使用 React Router v6 进行路由管理，提供了完整的单页面应用路由解决方案，支持嵌套路由、布局系统和路由守卫等功能。

## 📁 目录结构

```
src/router/
├── router.tsx          # 主路由配置文件
└── README.md          # 路由系统文档
```

## 🚀 核心组件说明

### 1. **BrowserRouter** - 路由器容器
- **作用**：整个路由系统的容器，使用浏览器的 History API 管理 URL
- **特点**：URL 看起来像正常的网站地址（如 `http://localhost:3000/welcome`）
- **使用场景**：必须包裹整个应用的路由系统

### 2. **Routes** - 路由规则集合
- **作用**：包含所有路由规则的容器，相当于应用的"路线图"
- **特点**：所有的 Route 组件都必须放在 Routes 里面
- **功能**：根据当前 URL 匹配最合适的路由规则

### 3. **Route** - 单个路由规则
- **作用**：定义具体的路由规则，指定"访问某个路径时显示哪个组件"
- **语法**：`<Route path="路径" element={<组件 />} />`
- **特点**：支持嵌套路由和动态参数

### 4. **Navigate** - 页面重定向
- **作用**：自动跳转到指定路径，常用于默认路由和 404 处理
- **语法**：`<Navigate to="目标路径" replace />`
- **特点**：`replace` 属性会替换当前历史记录，不会留下返回痕迹

## 🏗️ 布局系统说明

项目实现了嵌套路由布局系统，支持不同的页面使用不同的布局：

### 1. **默认布局 (LayoutDefault)**
- **特点**：包含导航栏和页脚的完整布局
- **适用页面**：`/welcome`, `/router-demo`, `/layout-demo`, `/i18n-demo`, `/api-demo`
- **样式**：浅色背景，白色内容区域，包含导航和页脚

### 2. **空白布局 (LayoutBlank)**
- **特点**：不包含导航栏和页脚的简洁布局
- **适用页面**：`/error`
- **样式**：黑色背景，白色文字，全屏展示

### 3. **嵌套路由工作原理**
- 使用 `Outlet` 组件渲染子路由内容
- 布局组件作为父路由，页面组件作为子路由
- 自动根据路由路径应用对应的布局样式

## 📋 路由配置

### 路由配置接口

```typescript
export interface RouteConfig {
  path: string;                    // 路由路径
  name?: string;                   // 路由名称
  element?: React.ReactNode;       // 路由组件
  redirect?: string;               // 重定向路径
  children?: RouteConfig[];        // 子路由
  meta?: {
    requiresAuth?: boolean;        // 是否需要认证
    title?: string;                // 页面标题
    layout?: 'default' | 'blank';  // 布局类型
  };
}
```

### 路由配置示例

项目支持多种路由类型：

- **重定向路由**: 自动跳转到指定页面
- **布局路由**: 包含布局组件的父路由
- **页面路由**: 具体的页面组件
- **嵌套路由**: 支持多层级的路由嵌套
- **404 路由**: 处理未匹配的路径

## 🎯 路由使用示例

### 1. 基本页面导航

```typescript
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <Link to="/welcome">欢迎页面</Link>
      <Link to="/router-demo">路由演示</Link>
      <Link to="/layout-demo">布局演示</Link>
      <Link to="/i18n-demo">多语言演示</Link>
      <Link to="/api-demo">API 演示</Link>
    </nav>
  );
};
```

### 2. 懒加载路由配置

项目支持类似 Vue Router 的懒加载语法，**无加载状态显示**：

```typescript
// 无加载状态的懒加载工具函数
const lazyLoad = (importFn: () => Promise<any>) => {
  const LazyComponent = lazy(importFn);
  // 直接返回组件，不显示加载状态
  return <LazyComponent />;
};

// 路由配置中使用懒加载
const routes = [
  {
    path: '/welcome',
    name: 'Welcome',
    element: lazyLoad(() => import('@/pages/welcome')), // 类似 Vue Router 的写法
    meta: {
      title: '欢迎页面',
    },
  },
  {
    path: '/news',
    name: 'News',
    element: lazyLoad(() => import('@/pages/news')),
    meta: {
      title: '新闻页面',
    },
  },
];
```

**懒加载的优势：**
- **代码分割**：每个页面组件单独打包，减少初始加载时间
- **按需加载**：只有访问对应页面时才加载相关代码
- **性能优化**：提高应用的整体性能
- **语法简洁**：类似 Vue Router 的写法，易于理解和使用
- **无加载状态**：刷新页面时不会显示"页面加载中..."，用户体验更好

### 3. 完整的懒加载示例

```typescript
import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 无加载状态的懒加载工具函数
const lazyLoad = (importFn: () => Promise<any>) => {
  const LazyComponent = lazy(importFn);
  // 直接返回组件，不显示加载状态
  return <LazyComponent />;
};

// 路由配置
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: lazyLoad(() => import('@/pages/home')),
      },
      {
        path: '/about',
        element: lazyLoad(() => import('@/pages/about')),
      },
      {
        path: '/contact',
        element: lazyLoad(() => import('@/pages/contact')),
      },
    ],
  },
];

// 使用路由
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
```

### 4. 懒加载 vs 同步加载对比

```typescript
// ❌ 同步加载 - 所有组件都会在初始加载时打包
import Home from '@/pages/home';
import About from '@/pages/about';
import Contact from '@/pages/contact';

const routes = [
  { path: '/home', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
];

// ✅ 懒加载 - 按需加载，性能更好
const routes = [
  { path: '/home', element: lazyLoad(() => import('@/pages/home')) },
  { path: '/about', element: lazyLoad(() => import('@/pages/about')) },
  { path: '/contact', element: lazyLoad(() => import('@/pages/contact')) },
];
```

### 2. 编程式导航

```typescript
import { useNavigate } from 'react-router-dom';

const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 登录成功后跳转到欢迎页面
    navigate('/welcome');
  };

  const handleGoBack = () => {
    // 返回上一页
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleLogin}>登录</button>
      <button onClick={handleGoBack}>返回</button>
    </div>
  );
};
```

### 3. 获取当前路由信息

```typescript
import { useLocation } from 'react-router-dom';

const CurrentPage: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      当前页面: {location.pathname}
      查询参数: {location.search}
      哈希: {location.hash}
    </div>
  );
};
```

### 4. 路由参数获取

```typescript
import { useParams } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      用户 ID: {id}
    </div>
  );
};
```

### 5. 嵌套路由示例

```typescript
// 父路由组件
const ParentComponent: React.FC = () => {
  return (
    <div>
      <h1>父组件</h1>
      <Outlet /> {/* 这里会渲染子路由内容 */}
    </div>
  );
};

// 子路由组件
const ChildComponent: React.FC = () => {
  return <div>子组件内容</div>;
};

// 路由配置
const routes = [
  {
    path: '/parent',
    element: <ParentComponent />,
    children: [
      {
        path: 'child',
        element: <ChildComponent />,
      },
    ],
  },
];
```

## 🔧 路由工具函数

### 递归渲染路由

项目使用递归函数来渲染嵌套路由：

```typescript
const renderRoute = (route: RouteConfig): React.ReactNode => {
  // 处理重定向路由
  if (route.redirect) {
    return (
      <Route
        key={route.name || route.path}
        path={route.path}
        element={<Navigate to={route.redirect} replace />}
      />
    );
  }

  // 处理有子路由的路由
  if (route.children && route.children.length > 0) {
    return (
      <Route
        key={route.name || route.path}
        path={route.path}
        element={route.element}
      >
        {route.children.map(child => renderRoute(child))}
      </Route>
    );
  }

  // 处理普通路由
  return (
    <Route
      key={route.name || route.path}
      path={route.path}
      element={route.element}
    />
  );
};
```

### 路由组件语法说明

项目使用标准的 JSX 语法来定义路由组件，并支持懒加载：

```typescript
// ✅ 推荐：使用 JSX 语法（更简洁易读）
element: <LayoutDefault />

// ✅ 推荐：使用懒加载（类似 Vue Router 的写法）
element: lazyLoad(() => import('@/pages/welcome'))

// ❌ 不推荐：使用 React.createElement（虽然功能相同，但不够简洁）
element: React.createElement(LayoutDefault)
```

**为什么使用 JSX 语法？**
1. **更简洁易读** - 代码更短，更直观
2. **符合 React 惯例** - 社区标准做法
3. **TypeScript 支持更好** - 类型推断更准确
4. **减少代码量** - 不需要额外的 React.createElement 调用

**懒加载的优势：**
1. **代码分割** - 按需加载，减少初始包大小
2. **性能优化** - 提高首屏加载速度
3. **类似 Vue Router** - 语法简洁，易于理解
4. **自动加载状态** - 内置加载提示

## 📝 最佳实践

### 1. 路由结构清晰
- 按功能模块组织路由
- 使用有意义的路径名称
- 合理使用嵌套路由

### 2. 默认重定向
- 为根路径设置合理的默认页面
- 为不存在的路径提供友好的处理方式

### 3. 路由守卫
- 在需要时添加权限验证
- 使用 `meta.requiresAuth` 标记需要认证的路由

### 4. 懒加载
- 对大型页面组件使用 React.lazy 进行代码分割
- 提高应用加载性能

### 5. 路由元信息
- 使用 `meta` 字段存储路由相关信息
- 便于路由守卫和页面标题管理

## 🐛 常见问题

### Q: 如何添加新的路由？
A: 在 `routes` 数组中添加新的路由配置，支持嵌套结构。

### Q: 如何实现路由守卫？
A: 在路由组件中检查用户权限，未授权时重定向到登录页面。

### Q: 如何处理 404 页面？
A: 使用 `path: '*'` 捕获所有未匹配的路由，重定向到默认页面。

### Q: 如何获取路由参数？
A: 使用 `useParams` Hook 获取动态路由参数。

### Q: 如何实现编程式导航？
A: 使用 `useNavigate` Hook 进行编程式页面跳转。

## 📚 相关文档

- [React Router 官方文档](https://reactrouter.com/)
- [React Router v6 迁移指南](https://reactrouter.com/docs/en/v6/upgrading/v5)
- [路由最佳实践](https://reactrouter.com/docs/en/v6/getting-started/overview)
