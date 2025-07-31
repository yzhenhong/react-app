# API 使用指南

本项目使用 Axios 作为 HTTP 客户端，提供了完整的 API 调用解决方案。

## 📁 目录结构

```
src/api/
├── config.ts          # Axios 基础配置
├── services/          # API 服务
│   ├── index.ts       # 服务导出
│   ├── userService.ts # 用户相关 API
│   └── commonService.ts # 通用 API 方法
└── hooks/             # 自定义 Hook
    └── useApi.ts      # API Hook
```

## 🚀 快速开始

### 1. 基础配置

在 `src/api/config.ts` 中配置了 Axios 实例：

```typescript
import { api } from '@/api/config';

// 直接使用配置好的 axios 实例
const response = await api.get('/users');
```

### 2. 使用 API 服务

```typescript
import { login, getCurrentUser } from '@/api/services/userService';

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

### 3. 使用自定义 Hook

```typescript
import { useSubmit, useFetch } from '@/api/hooks/useApi';
import { login, getCurrentUser } from '@/api/services/userService';

const MyComponent = () => {
  // 处理表单提交
  const loginSubmit = useSubmit(login, {
    successMessage: '登录成功！',
    errorMessage: '登录失败',
  });

  // 获取数据
  const userInfo = useFetch(getCurrentUser, {
    immediate: true, // 组件挂载时自动执行
  });

  const handleLogin = (formData) => {
    loginSubmit.execute(formData);
  };

  return (
    <div>
      {userInfo.loading && <div>加载中...</div>}
      {userInfo.data && <div>用户: {userInfo.data.name}</div>}
      {userInfo.error && <div>错误: {userInfo.error}</div>}
    </div>
  );
};
```

## 📋 API 服务

### 用户服务 (userService.ts)

```typescript
// 用户登录
login(data: LoginRequest): Promise<ApiResponse<LoginResponse>>

// 用户注册
register(data: RegisterRequest): Promise<ApiResponse<User>>

// 用户登出
logout(): Promise<ApiResponse<void>>

// 获取当前用户信息
getCurrentUser(): Promise<ApiResponse<User>>

// 更新用户信息
updateUser(data: UpdateUserRequest): Promise<ApiResponse<User>>

// 上传用户头像
uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>>

// 获取用户列表（管理员）
getUsers(params?: QueryParams): Promise<ApiResponse<{ users: User[]; total: number }>>
```

### 通用服务 (commonService.ts)

```typescript
// GET 请求
get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>>

// POST 请求
post<T>(url: string, data?: any): Promise<ApiResponse<T>>

// PUT 请求
put<T>(url: string, data?: any): Promise<ApiResponse<T>>

// DELETE 请求
del<T>(url: string): Promise<ApiResponse<T>>

// PATCH 请求
patch<T>(url: string, data?: any): Promise<ApiResponse<T>>

// 文件上传
uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>>

// 批量文件上传
uploadFiles<T>(url: string, files: File[], onProgress?: (progress: number) => void): Promise<ApiResponse<T>>
```

## 🎣 自定义 Hook

### useApi

最通用的 Hook，可以自定义所有行为：

```typescript
const apiCall = useApi(someApiFunction, {
  showError: true,        // 是否显示错误消息
  showSuccess: false,     // 是否显示成功消息
  successMessage: '操作成功',
  errorMessage: '操作失败',
  onSuccess: (data) => {
    // 成功回调
  },
  onError: (error) => {
    // 错误回调
  },
});

// 返回状态
const { data, loading, error, execute, reset } = apiCall;
```

### useFetch

用于数据获取，支持立即执行：

```typescript
const userInfo = useFetch(getCurrentUser, {
  immediate: true,        // 组件挂载时自动执行
  showError: true,
  onSuccess: (data) => {
    console.log('获取成功:', data);
  },
});
```

### useSubmit

用于表单提交，自动显示成功/错误消息：

```typescript
const loginSubmit = useSubmit(login, {
  successMessage: '登录成功！',
  errorMessage: '登录失败',
  onSuccess: (data) => {
    // 登录成功后的处理
  },
});
```

## 🔧 配置说明

### 基础配置

在 `src/api/config.ts` 中配置了：

- **基础 URL**: 根据环境变量设置
- **超时时间**: 10 秒
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

### 1. 错误处理

```typescript
try {
  const response = await api.get('/users');
  // 处理成功响应
} catch (error) {
  // 错误已经被拦截器处理，这里可以做额外处理
  console.error('API 调用失败:', error);
}
```

### 2. 加载状态

```typescript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await api.post('/submit', data);
  } finally {
    setLoading(false);
  }
};
```

### 3. 类型安全

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const response = await api.get<User>('/users/1');
const user: User = response.data;
```

### 4. 环境变量

在 `.env` 文件中设置 API 基础 URL：

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

## 🎯 示例组件

项目提供了两个示例组件：

1. **ApiDemo**: 基础 API 调用示例
2. **ApiDemoWithHooks**: 使用自定义 Hook 的示例

这些组件展示了如何在实际项目中使用 API 功能。

## 📚 相关文档

- [Axios 官方文档](https://axios-http.com/)
- [React Hook 文档](https://react.dev/reference/react/hooks)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
