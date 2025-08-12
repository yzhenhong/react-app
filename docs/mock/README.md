# Mock 数据使用指南

本项目使用 **MSW (Mock Service Worker)** 作为 Mock 数据解决方案，提供了强大的网络请求拦截和模拟功能，支持开发环境下的数据模拟和测试。

## 🎯 为什么选择 MSW？

### 优势
- **真实的网络请求** - 使用 Service Worker 拦截真实的 HTTP 请求
- **零配置** - 无需修改现有代码，直接拦截 API 调用
- **类型安全** - 完整的 TypeScript 支持
- **开发友好** - 支持热重载，开发体验优秀
- **生产就绪** - 可以用于测试环境

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

### 1. 环境配置

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

Mock 服务会自动启动，你会在控制台看到：

```
🎭 Mock 服务已启动
```

### 3. 测试 Mock 数据

项目提供了一个完整的 Mock 演示组件，你可以：

1. 访问 Mock 演示页面
2. 测试各种 API 接口
3. 查看 Mock 数据的响应

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
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
};
```

### 环境变量控制

- `REACT_APP_ENABLE_MOCK=true` - 启用 Mock 服务
- `REACT_APP_ENABLE_MOCK=false` - 禁用 Mock 服务

## 📝 创建 Mock 处理器

### 1. 创建处理器文件

在 `src/mock/handlers/` 目录下创建新的处理器文件：

```typescript
// src/mock/handlers/example.ts
import { http, HttpResponse, delay } from 'msw';

// Mock 数据
const mockData = [
  { id: '1', name: '示例数据1' },
  { id: '2', name: '示例数据2' },
];

// 处理器
export const exampleHandlers = [
  // GET 请求
  http.get('/api/example', async () => {
    await delay(300); // 模拟网络延迟

    return HttpResponse.json({
      code: 200,
      message: '获取数据成功',
      data: mockData,
      success: true,
    });
  }),

  // POST 请求
  http.post('/api/example', async ({ request }) => {
    await delay(500);

    const body = await request.json();

    return HttpResponse.json({
      code: 201,
      message: '创建成功',
      data: { id: '3', ...body },
      success: true,
    });
  }),
];
```

### 2. 注册处理器

在 `src/mock/handlers/index.ts` 中注册新的处理器：

```typescript
import { loginHandlers } from './login';
import { userHandlers } from './user';
import { articleHandlers } from './article';
import { exampleHandlers } from './example'; // 新增

export const handlers = [
  ...loginHandlers,
  ...userHandlers,
  ...articleHandlers,
  ...exampleHandlers, // 新增
];
```

## 🎨 Mock 数据最佳实践

### 1. 数据结构一致性

确保 Mock 数据与真实 API 响应结构一致：

```typescript
// 统一的响应格式
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// Mock 处理器
http.get('/api/users', async () => {
  return HttpResponse.json({
    code: 200,
    message: '获取用户列表成功',
    data: mockUsers,
    success: true,
  });
});
```

### 2. 错误处理

模拟各种错误情况：

```typescript
http.get('/api/users/:id', async ({ params }) => {
  const { id } = params;
  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    return HttpResponse.json(
      {
        code: 404,
        message: '用户不存在',
        data: null,
        success: false,
      },
      { status: 404 }
    );
  }

  return HttpResponse.json({
    code: 200,
    message: '获取用户成功',
    data: user,
    success: true,
  });
});
```

### 3. 网络延迟模拟

使用 `delay` 函数模拟真实的网络延迟：

```typescript
http.post('/api/users', async () => {
  await delay(600); // 模拟 600ms 延迟

  return HttpResponse.json({
    code: 201,
    message: '创建用户成功',
    data: newUser,
    success: true,
  });
});
```

### 4. 动态数据处理

支持查询参数和请求体处理：

```typescript
http.get('/api/users', async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const search = url.searchParams.get('search') || '';

  // 过滤和分页处理
  let filteredUsers = [...mockUsers];

  if (search) {
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return HttpResponse.json({
    code: 200,
    message: '获取用户列表成功',
    data: {
      users: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    },
    success: true,
  });
});
```

## 🔍 调试和监控

### 1. 控制台日志

Mock 服务会在控制台输出详细的请求信息：

```
🚀 API Request: {
  method: "POST",
  url: "/auth/login",
  data: { email: "zhangsan@example.com", password: "123456" }
}

✅ API Response: {
  status: 200,
  url: "/auth/login",
  data: { code: 200, message: "登录成功", ... }
}
```

### 2. 网络面板

在浏览器开发者工具的网络面板中，你可以看到：

- 被拦截的请求（标记为 Mock）
- 请求和响应的详细信息
- 网络延迟模拟

### 3. 调试技巧

```typescript
// 在处理器中添加调试信息
http.get('/api/users', async ({ request }) => {
  console.log('🎭 Mock 处理器被调用:', request.url);

  // 你的处理逻辑...

  console.log('🎭 Mock 响应数据:', responseData);
  return HttpResponse.json(responseData);
});
```

## 🧪 测试场景

### 1. 正常流程测试

```typescript
// 测试登录成功
const response = await login({ email: 'zhangsan@example.com', password: '123456' });
expect(response.success).toBe(true);
expect(response.data.user.name).toBe('张三');
```

### 2. 错误场景测试

```typescript
// 测试登录失败
const response = await login({ email: 'wrong@example.com', password: 'wrong' });
expect(response.success).toBe(false);
expect(response.message).toBe('用户不存在');
```

### 3. 网络异常测试

```typescript
// 测试网络延迟
const startTime = Date.now();
await getUsers();
const endTime = Date.now();
expect(endTime - startTime).toBeGreaterThan(300); // 延迟应该大于 300ms
```

## 🔄 与真实 API 切换

### 1. 开发环境

```bash
# 启用 Mock
REACT_APP_ENABLE_MOCK=true
REACT_APP_API_BASE_URL=

# 禁用 Mock，使用真实 API
REACT_APP_ENABLE_MOCK=false
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

### 2. 生产环境

Mock 服务只在开发环境启用，生产环境会自动禁用：

```typescript
const shouldEnableMock =
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_ENABLE_MOCK === 'true';
```

## 📊 性能优化

### 1. 延迟优化

根据不同的操作类型设置合适的延迟：

```typescript
// 查询操作 - 快速响应
http.get('/api/users', async () => {
  await delay(200);
  // ...
});

// 创建操作 - 中等延迟
http.post('/api/users', async () => {
  await delay(500);
  // ...
});

// 文件上传 - 较长延迟
http.post('/api/upload', async () => {
  await delay(1000);
  // ...
});
```

### 2. 数据缓存

对于不经常变化的数据，可以实现简单的缓存机制：

```typescript
let cachedUsers: User[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟

http.get('/api/users', async () => {
  const now = Date.now();

  if (cachedUsers && (now - cacheTime) < CACHE_DURATION) {
    return HttpResponse.json({
      code: 200,
      message: '获取用户列表成功（缓存）',
      data: cachedUsers,
      success: true,
    });
  }

  // 更新缓存
  cachedUsers = mockUsers;
  cacheTime = now;

  return HttpResponse.json({
    code: 200,
    message: '获取用户列表成功',
    data: cachedUsers,
    success: true,
  });
});
```

## 🎯 常见问题

### Q: Mock 服务没有启动怎么办？

A: 检查以下几点：
1. 确认 `.env.development` 文件中设置了 `REACT_APP_ENABLE_MOCK=true`
2. 确认在开发环境运行（`NODE_ENV=development`）
3. 检查浏览器控制台是否有错误信息
4. 确认 `public/mockServiceWorker.js` 文件存在

### Q: 如何调试 Mock 处理器？

A: 可以添加以下调试代码：

```typescript
http.get('/api/users', async ({ request }) => {
  console.log('🎭 请求信息:', {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
  });

  // 你的处理逻辑...
});
```

### Q: 如何模拟网络错误？

A: 可以抛出异常或返回错误响应：

```typescript
http.get('/api/users', async () => {
  // 模拟网络错误
  throw new Error('网络连接失败');

  // 或者返回错误响应
  return HttpResponse.json(
    {
      code: 500,
      message: '服务器内部错误',
      data: null,
      success: false,
    },
    { status: 500 }
  );
});
```

### Q: 如何模拟文件上传？

A: 使用 FormData 处理：

```typescript
http.post('/api/upload', async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return HttpResponse.json(
      {
        code: 400,
        message: '请选择文件',
        data: null,
        success: false,
      },
      { status: 400 }
    );
  }

  return HttpResponse.json({
    code: 200,
    message: '上传成功',
    data: {
      url: `https://example.com/uploads/${file.name}`,
      size: file.size,
    },
    success: true,
  });
});
```

## 📚 相关资源

- [MSW 官方文档](https://mswjs.io/)
- [MSW GitHub](https://github.com/mswjs/msw)
- [Service Worker 文档](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Mock 数据最佳实践](https://mswjs.io/docs/best-practices)

---

**Happy Mocking! 🎭**
