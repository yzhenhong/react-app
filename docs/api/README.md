# API 使用指南

本项目使用 Axios 作为 HTTP 客户端，提供了完整的 API 调用解决方案，遵循 RESTful API 规范和模块化设计。

## 📁 目录结构

```
src/api/
├── config.ts          # Axios 基础配置
├── index.ts           # 通用 API 方法封装（已优化类型处理）
├── login/             # 登录模块
│   ├── index.ts       # 登录相关 API
│   └── type.ts        # 登录模块类型定义
├── user/              # 用户管理模块
│   ├── index.ts       # 用户管理 API
│   └── type.ts        # 用户管理类型定义
└── article/           # 文章管理模块
    ├── index.ts       # 文章管理 API
    └── type.ts        # 文章管理类型定义
```

## 🚀 快速开始

### 1. 基础配置

在 `src/api/config.ts` 中配置了 Axios 实例：

```typescript
import { api } from '@/api';

// 直接使用配置好的 axios 实例
const response = await api.get('/users');
```

### 2. 使用通用 API 方法

```typescript
import { get, post, put, del } from '@/api';

// GET 请求
const users = await get('/users', { page: 1, limit: 10 });

// POST 请求
const newUser = await post('/users', { name: 'John', email: 'john@example.com' });

// PUT 请求
const updatedUser = await put('/users/1', { name: 'John Updated' });

// DELETE 请求
await del('/users/1');
```

### 3. 使用模块化 API

```typescript
import { login, getCurrentUser } from '@/api/login';
import type { LoginRequest } from '@/api/login/type';

// 用户登录
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await login({ email, password });
    if (response.success) {
      console.log('登录成功:', response.data);
    }
  } catch (error) {
    console.error('登录失败:', error);
  }
};
```

### 4. 在组件中使用

```typescript
import React, { useState } from 'react';
import { login, getCurrentUser } from '@/api/login';
import type { LoginRequest, User } from '@/api/login/type';

const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 处理登录
  const handleLogin = async (formData: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        // 获取用户信息
        await fetchUserInfo();
      } else {
        setError(response.message || '登录失败');
      }
    } catch (error) {
      setError('登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      setError('获取用户信息失败');
    }
  };

  return (
    <div>
      {loading && <div>加载中...</div>}
      {user && <div>用户: {user.name}</div>}
      {error && <div>错误: {error}</div>}
    </div>
  );
};
```

## 🔧 类型处理优化

### 优化背景

在项目开发过程中，我们发现每个 API 模块都需要单独引入 `ApiResponse` 类型，导致代码重复和维护成本增加。

### 优化方案

通过在 `src/api/index.ts` 中的通用请求方法（get、post、put、del、patch、uploadFile等）直接处理 `ApiResponse` 类型，各个 API 模块完全不需要引入任何额外的类型。

### 优化对比

**优化前：**
```typescript
import { get, post, put, del } from '@/api';
import type { ApiResponse } from '@/api';

export const getUser = async (id: string): Promise<ApiResponse<User>> => {
  return get<User>(`/users/${id}`);
};
```

**优化后：**
```typescript
import { get, post, put, del } from '@/api';

export const getUser = async (id: string) => {
  return get<User>(`/users/${id}`);
};
```

### 优化效果

- ✅ **完全消除类型引入重复** - 各个模块不再需要引入 `ApiResponse` 或任何其他额外类型
- ✅ **简化代码结构** - API函数定义更加简洁
- ✅ **保持类型安全** - TypeScript类型推断正常工作
- ✅ **提高可维护性** - 统一的API调用方式
- ✅ **减少代码量** - 每个API函数减少了类型声明代码

### 使用方法

现在创建新的API模块时，只需要：

1. **导入基础HTTP方法**：
```typescript
import { get, post, put, del, patch, uploadFile } from '@/api';
```

2. **直接使用这些方法**，无需任何额外的类型引入：
```typescript
export const myApiFunction = async (params) => {
  return get<MyDataType>('/my-endpoint', params);
};
```

3. **TypeScript会自动推断返回类型**为 `Promise<ApiResponse<T>>`

## 🌐 请求代理配置

### 代理配置说明

项目使用 **CRACO** 配置请求代理，这是更现代和灵活的方式。代理配置位于 `craco.config.ts` 中。

### CRACO 代理配置的优势

相比传统的 `setupProxy.js` 方式，CRACO 代理配置具有以下优势：

1. **TypeScript 支持** - 完整的类型检查和智能提示
2. **统一配置** - 所有配置集中在一个文件中
3. **更好的维护性** - 配置更清晰，易于管理
4. **现代化** - 符合现代前端开发最佳实践
5. **无额外依赖** - 不需要 `http-proxy-middleware` 依赖

### 代理规则

1. **API 代理**：`/api/*` → 后端服务器
2. **文件上传代理**：`/upload/*` → 文件服务器
3. **WebSocket 代理**：`/ws/*` → WebSocket 服务器

### 环境变量配置

可以通过环境变量配置代理目标：

```bash
# API 服务器地址
REACT_APP_API_BASE_URL=http://localhost:3001

# 文件上传服务器地址
REACT_APP_UPLOAD_URL=http://localhost:3002

# WebSocket 服务器地址
REACT_APP_WS_URL=ws://localhost:3004
```

### CRACO 配置示例

```typescript
// craco.config.ts
const cracoConfig = {
  webpack: {
    configure: (webpackConfig: any, { env, paths }: any) => {
      // 只在开发环境配置代理
      if (env === 'development') {
        webpackConfig.devServer = {
          ...webpackConfig.devServer,
          proxy: {
            // API 代理
            '/api': {
              target: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
              changeOrigin: true,
              pathRewrite: {
                '^/api': '/api',
              },
              // 请求拦截
              onProxyReq: (proxyReq, req, _res) => {
                console.log(`🔄 代理请求: ${req.method} ${req.url} -> ${proxyReq.path}`);
              },
            },

            // 文件上传代理
            '/upload': {
              target: process.env.REACT_APP_UPLOAD_URL || 'http://localhost:3002',
              changeOrigin: true,
              timeout: 30000,
            },

            // WebSocket 代理
            '/ws': {
              target: process.env.REACT_APP_WS_URL || 'ws://localhost:3004',
              changeOrigin: true,
              ws: true,
            },
          },
        };
      }
      return webpackConfig;
    },
  },
};
```

### 使用示例

```typescript
// 这些请求会自动被代理到对应的服务器
import { get, post } from '@/api';

// API 请求 - 会被代理到 http://localhost:3001/api/users
const users = await get('/users');

// 文件上传 - 会被代理到 http://localhost:3002/upload/file
const formData = new FormData();
formData.append('file', file);
await fetch('/upload/file', {
  method: 'POST',
  body: formData
});

// WebSocket 连接 - 会被代理到 ws://localhost:3004/ws/chat
const ws = new WebSocket('/ws/chat');
```

### 开发环境配置

在开发环境中，API 配置会自动使用相对路径：

```typescript
// 开发环境：baseURL = '/api'
// 生产环境：baseURL = 'http://localhost:3001/api'
```

这样确保了开发和生产环境的一致性。

## 📋 模块化 API

项目按功能模块组织 API，每个模块包含：

- **登录模块** (`/api/login`): 用户认证、登录、注册等
- **用户管理模块** (`/api/user`): 用户 CRUD 操作、权限管理等
- **文章管理模块** (`/api/article`): 文章 CRUD 操作、分类管理等

每个模块都提供完整的 TypeScript 类型支持和错误处理。

## 🔧 配置说明

### 基础配置

在 `src/api/config.ts` 中配置了：

- **基础 URL**: 根据环境变量设置
- **超时时间**: 15 秒
- **请求头**: 自动设置 Content-Type
- **凭证**: 支持跨域请求携带凭证

### 请求拦截器

- 自动添加认证 token
- 开发环境下打印请求日志
- 请求参数预处理

### 响应拦截器

- 统一错误处理
- 开发环境下打印响应日志
- 自动处理常见 HTTP 状态码

### 错误处理

- **401**: 未授权，清除 token 并提示重新登录
- **403**: 权限不足
- **404**: 资源不存在
- **500**: 服务器内部错误
- **网络错误**: 连接失败提示

## 📝 最佳实践

### 1. 模块化设计

- 按功能模块组织 API
- 每个模块包含 `index.ts`（API 方法）和 `type.ts`（类型定义）
- 遵循 RESTful API 规范

### 2. 类型安全

```typescript
import type { LoginRequest, User } from '@/api/login/type';

const handleLogin = async (data: LoginRequest): Promise<User | null> => {
  try {
    const response = await login(data);
    return response.success ? response.data.user : null;
  } catch (error) {
    console.error('登录失败:', error);
    return null;
  }
};
```

### 3. 错误处理

```typescript
try {
  const response = await get('/users');
  // 处理成功响应
} catch (error) {
  // 错误已经被拦截器处理，这里可以做额外处理
  console.error('API 调用失败:', error);
}
```

### 4. 加载状态

```typescript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await post('/submit', data);
  } finally {
    setLoading(false);
  }
};
```

### 5. 环境变量

在 `.env` 文件中设置 API 基础 URL：

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

### 6. 创建新的API模块

按照以下步骤创建新的API模块：

1. **创建模块目录**：
```
src/api/your-module/
├── index.ts       # API 方法
└── type.ts        # 类型定义
```

2. **定义类型**（在 `type.ts` 中）：
```typescript
export interface YourDataType {
  id: string;
  name: string;
  // ... 其他字段
}

export interface CreateYourDataRequest {
  name: string;
  // ... 其他字段
}
```

3. **实现API方法**（在 `index.ts` 中）：
```typescript
import { get, post, put, del } from '@/api';
import type { YourDataType, CreateYourDataRequest } from './type';

export const getYourData = async (id: string) => {
  return get<YourDataType>(`/your-endpoint/${id}`);
};

export const createYourData = async (data: CreateYourDataRequest) => {
  return post<YourDataType>('/your-endpoint', data);
};
```

## 🎯 示例组件

项目提供了一个完整的示例组件：

1. **ApiDemo**: 模块化 API 使用示例，展示了登录、用户信息获取、用户列表和文章列表等功能

这个组件展示了如何在实际项目中使用 API 功能。

## 📚 相关文档

- [Axios 官方文档](https://axios-http.com/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [RESTful API 设计指南](https://restfulapi.net/)
- [CRACO 官方文档](https://github.com/dilanx/craco)
