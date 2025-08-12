# API 接口使用指南

本项目使用 **Axios** 作为 HTTP 客户端，提供了完整的类型安全和错误处理机制。

## 🚀 核心特性

- **🔒 类型安全** - 完整的 TypeScript 类型支持
- **🔄 统一配置** - 集中化的 Axios 配置管理
- **❌ 错误处理** - 统一的错误处理和响应拦截
- **🔐 认证支持** - 自动的 Token 管理和刷新
- **📡 请求拦截** - 请求和响应的统一处理

## 📁 目录结构

```
src/api/
├── config.ts           # Axios 基础配置
├── index.ts            # API 统一导出
└── xxx/                # 各模块API
    ├── index.ts        # API 实现
    └── type.ts         # 相关类型定义
```

## ⚙️ 基础配置

### Axios 实例配置

在 `src/api/config.ts` 中配置 Axios 实例：

```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 Axios 实例
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证 Token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // Token 过期，跳转到登录页
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 环境变量配置

在 `.env.development` 文件中配置 API 基础 URL：

```bash
# 开发环境 API 配置
REACT_APP_API_BASE_URL=http://localhost:3001/api

# 启用 Mock 服务时，可以留空
# REACT_APP_API_BASE_URL=
```

## 📝 API 模块结构

### 1. 类型定义

每个 API 模块都应该有对应的类型定义文件：

```typescript
// src/api/login/type.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

### 2. API 实现

API 实现文件包含具体的接口调用逻辑：

```typescript
// src/api/login/index.ts
import api from '../config';
import type { LoginRequest, LoginResponse } from './type';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
};
```

## 🔧 使用示例

### 基本使用

```typescript
import { login, getUsers } from '@/api';

// 登录
const handleLogin = async () => {
  try {
    const response = await login({
      email: 'user@example.com',
      password: '123456',
    });

    // 保存 token
    localStorage.setItem('token', response.token);

    // 跳转到首页
    navigate('/');
  } catch (error) {
    console.error('登录失败:', error);
  }
};

// 获取用户列表
const handleGetUsers = async () => {
  try {
    const response = await getUsers({ page: 1, limit: 10 });
    setUsers(response.data.users);
  } catch (error) {
    console.error('获取用户列表失败:', error);
  }
};
```

### 带参数和查询的 API

```typescript
// 获取用户列表（带分页和搜索）
const getUsers = async (params: UserListParams): Promise<UserListResponse> => {
  const response = await api.get<UserListResponse>('/users', { params });
  return response.data;
};

// 更新用户信息
const updateUser = async (id: string, data: UpdateUserRequest): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, data);
  return response.data;
};

// 删除用户
const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
```

## 🎨 响应处理

### 统一响应格式

```typescript
// 统一的 API 响应格式
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  code?: number;
}

// 使用示例
const response = await api.get<ApiResponse<User[]>>('/users');
if (response.data.success) {
  setUsers(response.data.data);
} else {
  message.error(response.data.message);
}
```

### 错误处理

```typescript
try {
  const response = await login(credentials);
  // 处理成功响应
} catch (error) {
  if (axios.isAxiosError(error)) {
    // Axios 错误
    if (error.response) {
      // 服务器响应错误
      const { status, data } = error.response;
      switch (status) {
        case 400:
          message.error(data.message || '请求参数错误');
          break;
        case 401:
          message.error('未授权，请重新登录');
          break;
        case 403:
          message.error('权限不足');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器内部错误');
          break;
        default:
          message.error('请求失败');
      }
    } else if (error.request) {
      // 网络错误
      message.error('网络连接失败，请检查网络设置');
    } else {
      // 其他错误
      message.error('请求配置错误');
    }
  } else {
    // 非 Axios 错误
    message.error('未知错误');
  }
}
```

## 🔐 认证和授权

### Token 管理

```typescript
// 自动添加 Token 到请求头
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Token 过期处理
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期，清除本地存储并跳转登录页
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 刷新 Token

```typescript
// Token 刷新逻辑
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/auth/refresh', { refreshToken });
        const { token } = response.data;

        localStorage.setItem('token', token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        processQueue(null, token);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
```

## 📊 请求和响应监控

### 请求日志

```typescript
// 请求日志记录
api.interceptors.request.use((config) => {
  console.log('🚀 API Request:', {
    method: config.method?.toUpperCase(),
    url: config.url,
    data: config.data,
    params: config.params,
  });
  return config;
});

// 响应日志记录
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);
```

## 🧪 测试支持

### Mock 数据集成

当启用 Mock 服务时，API 调用会被 MSW 拦截：

```typescript
// 在开发环境中，这些 API 调用会被 Mock 服务拦截
const users = await getUsers({ page: 1, limit: 10 });

// 在生产环境中，这些 API 调用会发送到真实的服务器
```

### 测试环境配置

```typescript
// 测试环境配置
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: process.env.NODE_ENV === 'test' ? 5000 : 10000,
});
```

## 📚 最佳实践

### 1. 类型安全

- 为所有 API 请求和响应定义 TypeScript 接口
- 使用泛型确保类型安全
- 避免使用 `any` 类型

### 2. 错误处理

- 实现统一的错误处理机制
- 为用户提供友好的错误提示
- 记录详细的错误日志

### 3. 性能优化

- 合理设置请求超时时间
- 实现请求去重和缓存
- 使用请求取消机制

### 4. 安全性

- 验证和清理用户输入
- 使用 HTTPS 传输敏感数据
- 实现适当的认证和授权

## 🆘 常见问题

### Q: 如何处理跨域问题？
A: 在开发环境中，可以通过代理配置解决跨域问题。在生产环境中，需要后端支持 CORS。

### Q: 如何实现请求重试？
A: 可以使用 Axios 的拦截器实现请求重试逻辑，或者使用第三方库如 `axios-retry`。

### Q: 如何取消正在进行的请求？
A: 使用 Axios 的 `CancelToken` 或 `AbortController` 来取消请求。

### Q: 如何实现请求队列？
A: 可以使用 Axios 拦截器实现请求队列，确保请求按顺序执行。

---

**Happy API Development! 🚀**
