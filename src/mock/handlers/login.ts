/*
 * @Author: yangzhenhong
 * @Date: 2025-08-04 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-12 10:44:08
 * @FilePath: \react-app\src\mock\handlers\login.ts
 * @Description: 登录模块 Mock 处理器
 */

import { http, HttpResponse, delay } from 'msw';
import type {
  LoginRequest,
  LoginResponse,
  User,
  RegisterRequest,
  UpdateUserRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  SendVerificationCodeRequest,
} from '@/api/login/type';

// Mock 用户数据
const mockUsers: User[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

// Mock 令牌数据
const mockTokens = {
  'zhangsan@example.com': {
    token: 'mock-jwt-token-zhangsan',
    refreshToken: 'mock-refresh-token-zhangsan',
  },
  'lisi@example.com': {
    token: 'mock-jwt-token-lisi',
    refreshToken: 'mock-refresh-token-lisi',
  },
};

/**
 * 登录模块 Mock 处理器
 */
export const loginHandlers = [
  /**
   * 用户登录
   * POST /auth/login
   */
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500); // 模拟网络延迟

    const body = (await request.json()) as LoginRequest;
    const { email, password } = body;

    // 模拟登录验证
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      return HttpResponse.json(
        {
          code: 400,
          message: '用户不存在',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    // 模拟密码验证（这里简单判断密码是否为 '123456'）
    if (password !== '123456') {
      return HttpResponse.json(
        {
          code: 400,
          message: '密码错误',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    const tokens = mockTokens[email as keyof typeof mockTokens];

    const response: LoginResponse = {
      user,
      token: tokens.token,
      refreshToken: tokens.refreshToken,
      expiresIn: 3600, // 1小时
    };

    return HttpResponse.json({
      code: 200,
      message: '登录成功',
      data: response,
      success: true,
    });
  }),

  /**
   * 用户注册
   * POST /auth/register
   */
  http.post('/api/auth/register', async ({ request }) => {
    await delay(800); // 模拟网络延迟

    const body = (await request.json()) as RegisterRequest;
    const { name, email } = body;

    // 检查邮箱是否已存在
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return HttpResponse.json(
        {
          code: 400,
          message: '邮箱已被注册',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    // 创建新用户
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return HttpResponse.json({
      code: 201,
      message: '注册成功',
      data: newUser,
      success: true,
    });
  }),

  /**
   * 用户登出
   * POST /auth/logout
   */
  http.post('/api/auth/logout', async () => {
    await delay(200); // 模拟网络延迟

    return HttpResponse.json({
      code: 200,
      message: '登出成功',
      data: null,
      success: true,
    });
  }),

  /**
   * 获取当前用户信息
   * GET /auth/me
   */
  http.get('/api/auth/me', async ({ request }) => {
    await delay(300); // 模拟网络延迟

    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          code: 401,
          message: '未授权访问',
          data: null,
          success: false,
        },
        { status: 401 }
      );
    }

    // 根据 token 查找用户（这里简化处理，直接返回第一个用户）
    const user = mockUsers[0];

    return HttpResponse.json({
      code: 200,
      message: '获取用户信息成功',
      data: user,
      success: true,
    });
  }),

  /**
   * 更新用户信息
   * PUT /auth/profile
   */
  http.put('/api/auth/profile', async ({ request }) => {
    await delay(400); // 模拟网络延迟

    const body = (await request.json()) as UpdateUserRequest;
    const { name, email } = body;

    // 模拟更新用户信息
    const updatedUser: User = {
      ...mockUsers[0],
      name: name || mockUsers[0].name,
      email: email || mockUsers[0].email,
      updatedAt: new Date().toISOString(),
    };

    // 更新 mock 数据
    mockUsers[0] = updatedUser;

    return HttpResponse.json({
      code: 200,
      message: '更新用户信息成功',
      data: updatedUser,
      success: true,
    });
  }),

  /**
   * 上传用户头像
   * POST /auth/avatar
   */
  http.post('/api/auth/avatar', async ({ request }) => {
    await delay(1000); // 模拟文件上传延迟

    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return HttpResponse.json(
        {
          code: 400,
          message: '请选择头像文件',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    // 模拟上传成功，返回头像URL
    const avatarUrl = `https://example.com/avatars/${Date.now()}-${file.name}`;

    return HttpResponse.json({
      code: 200,
      message: '头像上传成功',
      data: { avatarUrl },
      success: true,
    });
  }),

  /**
   * 重置密码
   * POST /auth/reset-password
   */
  http.post('/api/auth/reset-password', async ({ request }) => {
    await delay(600); // 模拟网络延迟

    const body = (await request.json()) as ResetPasswordRequest;
    const { email } = body;

    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      return HttpResponse.json(
        {
          code: 400,
          message: '用户不存在',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      code: 200,
      message: '重置密码邮件已发送',
      data: null,
      success: true,
    });
  }),

  /**
   * 修改密码
   * PUT /auth/change-password
   */
  http.put('/api/auth/change-password', async ({ request }) => {
    await delay(400); // 模拟网络延迟

    const body = (await request.json()) as ChangePasswordRequest;
    const { oldPassword } = body;

    // 模拟密码验证
    if (oldPassword !== '123456') {
      return HttpResponse.json(
        {
          code: 400,
          message: '原密码错误',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      code: 200,
      message: '密码修改成功',
      data: null,
      success: true,
    });
  }),

  /**
   * 验证邮箱
   * POST /auth/verify-email
   */
  http.post('/api/auth/verify-email', async ({ request }) => {
    await delay(300); // 模拟网络延迟

    const body = (await request.json()) as VerifyEmailRequest;
    const { code } = body;

    // 模拟验证码验证（这里简单判断验证码是否为 '123456'）
    if (code !== '123456') {
      return HttpResponse.json(
        {
          code: 400,
          message: '验证码错误',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      code: 200,
      message: '邮箱验证成功',
      data: null,
      success: true,
    });
  }),

  /**
   * 发送验证码
   * POST /auth/send-verification-code
   */
  http.post('/api/auth/send-verification-code', async ({ request }) => {
    await delay(500); // 模拟网络延迟

    const body = (await request.json()) as SendVerificationCodeRequest;
    const { email } = body;

    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      return HttpResponse.json(
        {
          code: 400,
          message: '用户不存在',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      code: 200,
      message: '验证码发送成功',
      data: null,
      success: true,
    });
  }),

  /**
   * 刷新访问令牌
   * POST /auth/refresh-token
   */
  http.post('/api/auth/refresh-token', async ({ request }) => {
    await delay(300); // 模拟网络延迟

    const body = (await request.json()) as { refreshToken: string };
    const { refreshToken } = body;

    // 模拟刷新令牌验证
    const validRefreshTokens = Object.values(mockTokens).map(
      t => t.refreshToken
    );

    if (!validRefreshTokens.includes(refreshToken)) {
      return HttpResponse.json(
        {
          code: 401,
          message: '刷新令牌无效',
          data: null,
          success: false,
        },
        { status: 401 }
      );
    }

    // 生成新的令牌
    const newTokens = {
      token: `mock-jwt-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
    };

    return HttpResponse.json({
      code: 200,
      message: '令牌刷新成功',
      data: newTokens,
      success: true,
    });
  }),

  /**
   * 删除用户账户
   * DELETE /auth/account
   */
  http.delete('/api/auth/account', async () => {
    await delay(400); // 模拟网络延迟

    return HttpResponse.json({
      code: 200,
      message: '账户删除成功',
      data: null,
      success: true,
    });
  }),
];
