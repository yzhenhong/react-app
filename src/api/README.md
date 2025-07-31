# API 使用指南

本项目使用 Axios 作为 HTTP 客户端，提供了完整的 API 调用解决方案，遵循 RESTful API 规范和模块化设计。

## 📁 目录结构

```
src/api/
├── config.ts          # Axios 基础配置
├── index.ts           # 通用 API 方法封装
├── login/             # 登录模块
│   ├── index.ts       # 登录相关 API
│   └── type.ts        # 登录模块类型定义
├── user/              # 用户管理模块
│   ├── index.ts       # 用户管理 API
│   └── type.ts        # 用户管理类型定义
├── article/           # 文章管理模块
│   ├── index.ts       # 文章管理 API
│   └── type.ts        # 文章管理类型定义
└── README.md          # 详细使用指南
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

## 📋 模块化 API

### 登录模块 (`/api/login`)

```typescript
import { login, register, logout, getCurrentUser } from '@/api/login';
import type { LoginRequest, User } from '@/api/login/type';

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

// 重置密码
resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>>

// 修改密码
changePassword(data: ChangePasswordRequest): Promise<ApiResponse<void>>

// 验证邮箱
verifyEmail(data: VerifyEmailRequest): Promise<ApiResponse<void>>

// 发送验证码
sendVerificationCode(data: SendVerificationCodeRequest): Promise<ApiResponse<void>>

// 刷新访问令牌
refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string; refreshToken: string }>>

// 删除用户账户
deleteAccount(): Promise<ApiResponse<void>>
```

### 用户管理模块 (`/api/user`)

```typescript
import { getUsers, createUser, updateUser, deleteUser } from '@/api/user';
import type { User, CreateUserRequest, UpdateUserRequest } from '@/api/user/type';

// 获取用户列表
getUsers(params?: UserListParams): Promise<ApiResponse<UserListResponse>>

// 获取单个用户信息
getUser(id: string): Promise<ApiResponse<User>>

// 创建用户
createUser(data: CreateUserRequest): Promise<ApiResponse<User>>

// 更新用户信息
updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>>

// 删除用户
deleteUser(id: string): Promise<ApiResponse<void>>

// 批量删除用户
batchDeleteUsers(ids: string[]): Promise<ApiResponse<void>>

// 获取用户统计信息
getUserStats(): Promise<ApiResponse<UserStats>>

// 激活用户
activateUser(id: string): Promise<ApiResponse<User>>

// 停用用户
deactivateUser(id: string): Promise<ApiResponse<User>>

// 封禁用户
banUser(id: string, reason?: string): Promise<ApiResponse<User>>

// 解封用户
unbanUser(id: string): Promise<ApiResponse<User>>

// 重置用户密码
resetUserPassword(id: string): Promise<ApiResponse<{ newPassword: string }>>

// 导出用户数据
exportUsers(params?: UserListParams): Promise<ApiResponse<{ downloadUrl: string }>>
```

### 文章管理模块 (`/api/article`)

```typescript
import { getArticles, createArticle, updateArticle, deleteArticle } from '@/api/article';
import type { Article, CreateArticleRequest, UpdateArticleRequest } from '@/api/article/type';

// 获取文章列表
getArticles(params?: ArticleListParams): Promise<ApiResponse<ArticleListResponse>>

// 获取单个文章信息
getArticle(id: string): Promise<ApiResponse<Article>>

// 创建文章
createArticle(data: CreateArticleRequest): Promise<ApiResponse<Article>>

// 更新文章信息
updateArticle(id: string, data: UpdateArticleRequest): Promise<ApiResponse<Article>>

// 删除文章
deleteArticle(id: string): Promise<ApiResponse<void>>

// 批量删除文章
batchDeleteArticles(ids: string[]): Promise<ApiResponse<void>>

// 发布文章
publishArticle(id: string): Promise<ApiResponse<Article>>

// 取消发布文章
unpublishArticle(id: string): Promise<ApiResponse<Article>>

// 归档文章
archiveArticle(id: string): Promise<ApiResponse<Article>>

// 获取文章统计信息
getArticleStats(): Promise<ApiResponse<ArticleStats>>

// 获取文章分类列表
getCategories(): Promise<ApiResponse<Category[]>>

// 创建文章分类
createCategory(data: { name: string; description?: string; parentId?: string }): Promise<ApiResponse<Category>>

// 更新文章分类
updateCategory(id: string, data: { name?: string; description?: string; parentId?: string }): Promise<ApiResponse<Category>>

// 删除文章分类
deleteCategory(id: string): Promise<ApiResponse<void>>

// 获取文章评论列表
getArticleComments(articleId: string): Promise<ApiResponse<Comment[]>>

// 创建文章评论
createArticleComment(articleId: string, data: CreateCommentRequest): Promise<ApiResponse<Comment>>

// 删除文章评论
deleteArticleComment(articleId: string, commentId: string): Promise<ApiResponse<void>>

// 点赞文章
likeArticle(id: string): Promise<ApiResponse<void>>

// 取消点赞文章
unlikeArticle(id: string): Promise<ApiResponse<void>>

// 增加文章浏览量
incrementArticleView(id: string): Promise<ApiResponse<void>>
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

## 🎯 示例组件

项目提供了一个完整的示例组件：

1. **ApiDemo**: 模块化 API 使用示例，展示了登录、用户信息获取、用户列表和文章列表等功能

这个组件展示了如何在实际项目中使用 API 功能。

## 📚 相关文档

- [Axios 官方文档](https://axios-http.com/)

- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [RESTful API 设计指南](https://restfulapi.net/)
