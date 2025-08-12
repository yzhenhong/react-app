# Mock 数据使用指南

本项目使用 **MSW (Mock Service Worker)** 作为 Mock 数据解决方案，提供了强大的网络请求拦截和模拟功能，支持开发环境下的数据模拟和测试。

## 🎯 为什么选择 MSW？

### 核心优势
- **🌐 网络级拦截** - 使用 Service Worker 拦截真实的 HTTP 请求
- **⚡ 零配置** - 无需修改现有代码，直接拦截 API 调用
- **🔒 类型安全** - 完整的 TypeScript 支持
- **🔥 热重载** - 支持实时修改，开发体验优秀
- **🚀 生产就绪** - 可以用于测试环境

### 与其他 Mock 方案的对比

| 特性 | MSW | json-server | Mock.js |
|------|-----|-------------|---------|
| 网络拦截 | ✅ | ❌ | ❌ |
| 零配置 | ✅ | ❌ | ❌ |
| TypeScript | ✅ | ❌ | ❌ |
| 热重载 | ✅ | ❌ | ❌ |
| 生产可用 | ✅ | ❌ | ❌ |

## 📁 目录结构

```
src/mock/
├── index.ts              # Mock 服务主入口
├── handlers/             # Mock 处理器目录
│   ├── index.ts         # 处理器整合
│   ├── login.ts         # 登录模块 Mock
│   ├── user.ts          # 用户管理 Mock
│   └── article.ts       # 文章管理 Mock
```

## 🚀 快速开始

### 1. 启用 Mock 服务

在 `.env.development` 文件中设置：

```bash
REACT_APP_ENABLE_MOCK=true
```

### 2. 启动开发服务器

```bash
npm start
```

### 3. 访问演示页面

打开浏览器访问：`http://localhost:3000/mock-demo`

## 📋 可用的 Mock API

### 🔐 登录模块
- `POST /auth/login` - 用户登录
- `POST /auth/register` - 用户注册
- `POST /auth/logout` - 用户登出
- `GET /auth/me` - 获取当前用户信息
- `PUT /auth/profile` - 更新用户信息
- `POST /auth/avatar` - 上传用户头像

### 👥 用户管理模块
- `GET /users` - 获取用户列表（支持分页、搜索、过滤）
- `GET /users/:id` - 获取单个用户信息
- `POST /users` - 创建用户
- `PUT /users/:id` - 更新用户信息
- `DELETE /users/:id` - 删除用户
- `DELETE /users/batch` - 批量删除用户
- `GET /users/stats` - 获取用户统计信息

### 📝 文章管理模块
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

## 🎨 特性说明

### 网络延迟模拟
- **查询操作**: 200-400ms
- **创建/更新操作**: 400-600ms
- **删除操作**: 300-500ms
- **文件上传**: 1000ms

### 错误处理
- 支持各种 HTTP 状态码
- 模拟网络错误
- 模拟业务逻辑错误

### 数据验证
- 邮箱格式验证
- 必填字段验证
- 数据唯一性检查

## 🔧 配置说明

### Mock 服务配置

在 `src/mock/index.ts` 中配置 Mock 服务：

```typescript
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 创建 MSW Worker 实例
export const worker = setupWorker(...handlers);

// 启动 Mock 服务
export const startMock = async () => {
  const shouldEnableMock =
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_ENABLE_MOCK === 'true';

  if (shouldEnableMock) {
    await worker.start({
      onUnhandledRequest: 'bypass', // 未处理的请求直接通过
      quiet: false, // 显示详细日志
    });
  }
};
```

### 环境变量控制

| 变量名 | 说明 | 可选值 |
|--------|------|--------|
| `REACT_APP_ENABLE_MOCK` | 是否启用 Mock 服务 | `true` / `false` |
| `NODE_ENV` | 运行环境 | `development` / `production` |

## 🛠️ 自定义 Mock 数据

### 1. 修改现有数据

编辑对应的 Mock 处理器文件：
- `src/mock/handlers/login.ts` - 登录相关数据
- `src/mock/handlers/user.ts` - 用户管理数据
- `src/mock/handlers/article.ts` - 文章管理数据

### 2. 添加新的 Mock 处理器

1. 在 `src/mock/handlers/` 目录下创建新的处理器文件
2. 在 `src/mock/handlers/index.ts` 中注册新的处理器
3. 重启开发服务器

### 3. 处理器示例

```typescript
import { http, HttpResponse, delay } from 'msw';

export const userHandlers = [
  // 获取用户列表
  http.get('/users', async ({ request }) => {
    await delay(300); // 模拟网络延迟

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    return HttpResponse.json({
      success: true,
      message: '获取用户列表成功',
      data: {
        users: mockUsers.slice((page - 1) * limit, page * limit),
        total: mockUsers.length,
        page,
        limit,
      },
    });
  }),
];
```

## 🔍 调试技巧

### 1. 查看控制台日志
Mock 服务会在控制台输出详细的请求和响应信息。

### 2. 使用浏览器开发者工具
在 Network 面板中查看被拦截的请求。

### 3. 临时禁用 Mock
设置 `REACT_APP_ENABLE_MOCK=false` 来禁用 Mock 服务。

## 🎯 测试账号

### 登录测试
- **邮箱**: `zhangsan@example.com`
- **密码**: `123456`

### 其他测试账号
- **邮箱**: `lisi@example.com`
- **密码**: `123456`

## 📚 更多资源

- [MSW 官方文档](https://mswjs.io/)
- [MSW GitHub](https://github.com/mswjs/msw)
- [项目 Mock 演示页面](../mock-demo)

## 🆘 常见问题

### Q: Mock 服务没有启动怎么办？
A: 检查环境变量 `REACT_APP_ENABLE_MOCK` 是否设置为 `true`，并确保在开发环境下运行。

### Q: 如何添加新的 API 端点？
A: 在对应的处理器文件中添加新的 `http` 处理器，并在 `handlers/index.ts` 中注册。

### Q: Mock 数据如何与真实 API 切换？
A: 通过环境变量 `REACT_APP_ENABLE_MOCK` 控制，设置为 `false` 时使用真实 API。

---

**Happy Mocking! 🎭**
