# 🎭 Mock 数据使用说明

## 快速开始

### 1. 启用 Mock 服务

创建 `.env.development` 文件（参考 `env.example`）：

```bash
# 启用 Mock 服务
REACT_APP_ENABLE_MOCK=true

# API 基础 URL（开发环境留空以使用 Mock）
REACT_APP_API_BASE_URL=
```

### 2. 启动开发服务器

```bash
npm start
```

### 3. 访问 Mock 演示页面

在浏览器中访问：`http://localhost:3000/mock-demo`

## 🎯 测试账号

### 登录测试
- **邮箱**: `zhangsan@example.com`
- **密码**: `123456`

### 其他测试账号
- **邮箱**: `lisi@example.com`
- **密码**: `123456`

## 📋 可用的 Mock API

### 登录模块
- `POST /auth/login` - 用户登录
- `POST /auth/register` - 用户注册
- `POST /auth/logout` - 用户登出
- `GET /auth/me` - 获取当前用户信息
- `PUT /auth/profile` - 更新用户信息
- `POST /auth/avatar` - 上传用户头像

### 用户管理模块
- `GET /users` - 获取用户列表（支持分页、搜索、过滤）
- `GET /users/:id` - 获取单个用户信息
- `POST /users` - 创建用户
- `PUT /users/:id` - 更新用户信息
- `DELETE /users/:id` - 删除用户
- `DELETE /users/batch` - 批量删除用户
- `GET /users/stats` - 获取用户统计信息

### 文章管理模块
- `GET /articles` - 获取文章列表（支持分页、搜索、过滤）
- `GET /articles/:id` - 获取单个文章详情
- `POST /articles` - 创建文章
- `PUT /articles/:id` - 更新文章
- `DELETE /articles/:id` - 删除文章
- `DELETE /articles/batch` - 批量删除文章
- `GET /articles/categories` - 获取文章分类
- `GET /articles/tags` - 获取文章标签
- `POST /articles/:id/like` - 点赞文章
- `DELETE /articles/:id/like` - 取消点赞文章
- `GET /articles/stats` - 获取文章统计信息

## 🔧 自定义 Mock 数据

### 1. 修改现有数据

编辑对应的 Mock 处理器文件：
- `src/mock/handlers/login.ts` - 登录相关数据
- `src/mock/handlers/user.ts` - 用户管理数据
- `src/mock/handlers/article.ts` - 文章管理数据

### 2. 添加新的 Mock 处理器

1. 在 `src/mock/handlers/` 目录下创建新的处理器文件
2. 在 `src/mock/handlers/index.ts` 中注册新的处理器
3. 重启开发服务器

## 🎨 特性说明

### 网络延迟模拟
- 查询操作：200-400ms
- 创建/更新操作：400-600ms
- 删除操作：300-500ms
- 文件上传：1000ms

### 错误处理
- 支持各种 HTTP 状态码
- 模拟网络错误
- 模拟业务逻辑错误

### 数据验证
- 邮箱格式验证
- 必填字段验证
- 数据唯一性检查

## 🔍 调试技巧

### 1. 查看控制台日志
Mock 服务会在控制台输出详细的请求和响应信息。

### 2. 使用浏览器开发者工具
在 Network 面板中查看被拦截的请求。

### 3. 临时禁用 Mock
设置 `REACT_APP_ENABLE_MOCK=false` 来禁用 Mock 服务。

## 📚 更多信息

详细的使用指南请参考：`docs/mock/README.md`

---

**Happy Mocking! 🎭**
