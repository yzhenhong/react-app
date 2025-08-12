/*
 * @Author: yangzhenhong
 * @Date: 2025-08-04 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-12 11:24:47
 * @FilePath: \react-app\src\mock\handlers\user.ts
 * @Description: 用户管理模块 Mock 处理器
 */

import { http, HttpResponse, delay } from 'msw';
import type { User } from '@/api/login/type';

// 定义用户创建和更新请求类型
interface CreateUserRequest {
  name: string;
  email: string;
  role?: 'user' | 'admin' | 'moderator';
  status?: 'active' | 'inactive';
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'user' | 'admin' | 'moderator';
  status?: 'active' | 'inactive';
}

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
  {
    id: '3',
    name: '王五',
    email: 'wangwu@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: '赵六',
    email: 'zhaoliu@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu',
    role: 'moderator',
    status: 'active',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    name: '钱七',
    email: 'qianqi@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=qianqi',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
];

/**
 * 用户管理模块 Mock 处理器
 */
export const userHandlers = [
  /**
   * 获取用户列表
   * GET /users
   */
  http.get('/users', async ({ request }) => {
    await delay(400); // 模拟网络延迟

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    const role = url.searchParams.get('role') || '';
    const status = url.searchParams.get('status') || '';

    // 过滤用户数据
    let filteredUsers = [...mockUsers];

    // 搜索过滤
    if (search) {
      filteredUsers = filteredUsers.filter(
        user =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 角色过滤
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // 状态过滤
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    // 分页处理
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
  }),

  /**
   * 获取单个用户信息
   * GET /users/:id
   */
  http.get('/users/:id', async ({ params }) => {
    await delay(300); // 模拟网络延迟

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
      message: '获取用户信息成功',
      data: user,
      success: true,
    });
  }),

  /**
   * 创建用户
   * POST /users
   */
  http.post('/users', async ({ request }) => {
    await delay(600); // 模拟网络延迟

    const body = (await request.json()) as CreateUserRequest;
    const { name, email, role, status } = body;

    // 检查邮箱是否已存在
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return HttpResponse.json(
        {
          code: 400,
          message: '邮箱已被使用',
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
      role: role || 'user',
      status: status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return HttpResponse.json({
      code: 201,
      message: '创建用户成功',
      data: newUser,
      success: true,
    });
  }),

  /**
   * 更新用户信息
   * PUT /users/:id
   */
  http.put('/users/:id', async ({ params, request }) => {
    await delay(400); // 模拟网络延迟

    const { id } = params;
    const body = (await request.json()) as UpdateUserRequest;
    const { name, email, role, status } = body;

    const userIndex = mockUsers.findIndex(u => u.id === id);

    if (userIndex === -1) {
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

    // 检查邮箱是否被其他用户使用
    if (email && email !== mockUsers[userIndex].email) {
      const existingUser = mockUsers.find(
        u => u.email === email && u.id !== id
      );
      if (existingUser) {
        return HttpResponse.json(
          {
            code: 400,
            message: '邮箱已被其他用户使用',
            data: null,
            success: false,
          },
          { status: 400 }
        );
      }
    }

    // 更新用户信息
    const updatedUser: User = {
      ...mockUsers[userIndex],
      name: name || mockUsers[userIndex].name,
      email: email || mockUsers[userIndex].email,
      role: role || mockUsers[userIndex].role,
      status: status || mockUsers[userIndex].status,
      updatedAt: new Date().toISOString(),
    };

    mockUsers[userIndex] = updatedUser;

    return HttpResponse.json({
      code: 200,
      message: '更新用户信息成功',
      data: updatedUser,
      success: true,
    });
  }),

  /**
   * 删除用户
   * DELETE /users/:id
   */
  http.delete('/users/:id', async ({ params }) => {
    await delay(300); // 模拟网络延迟

    const { id } = params;
    const userIndex = mockUsers.findIndex(u => u.id === id);

    if (userIndex === -1) {
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

    // 检查是否为管理员用户
    if (mockUsers[userIndex].role === 'admin') {
      return HttpResponse.json(
        {
          code: 403,
          message: '不能删除管理员用户',
          data: null,
          success: false,
        },
        { status: 403 }
      );
    }

    // 删除用户
    const deletedUser = mockUsers.splice(userIndex, 1)[0];

    return HttpResponse.json({
      code: 200,
      message: '删除用户成功',
      data: deletedUser,
      success: true,
    });
  }),

  /**
   * 批量删除用户
   * DELETE /users/batch
   */
  http.delete('/users/batch', async ({ request }) => {
    await delay(500); // 模拟网络延迟

    const body = (await request.json()) as { ids: string[] };
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return HttpResponse.json(
        {
          code: 400,
          message: '请选择要删除的用户',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    const deletedUsers: User[] = [];
    const failedIds: string[] = [];

    ids.forEach(id => {
      const userIndex = mockUsers.findIndex(u => u.id === id);

      if (userIndex === -1) {
        failedIds.push(id);
      } else if (mockUsers[userIndex].role === 'admin') {
        failedIds.push(id);
      } else {
        const deletedUser = mockUsers.splice(userIndex, 1)[0];
        deletedUsers.push(deletedUser);
      }
    });

    return HttpResponse.json({
      code: 200,
      message: '批量删除完成',
      data: {
        deletedUsers,
        failedIds,
        successCount: deletedUsers.length,
        failedCount: failedIds.length,
      },
      success: true,
    });
  }),

  /**
   * 获取用户统计信息
   * GET /users/stats
   */
  http.get('/users/stats', async () => {
    await delay(200); // 模拟网络延迟

    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.filter(u => u.status === 'active').length;
    const inactiveUsers = mockUsers.filter(u => u.status === 'inactive').length;

    const roleStats = mockUsers.reduce(
      (acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return HttpResponse.json({
      code: 200,
      message: '获取用户统计信息成功',
      data: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
        roleStats,
      },
      success: true,
    });
  }),

  /**
   * 重置用户密码
   * POST /users/:id/reset-password
   */
  http.post('/users/:id/reset-password', async ({ params }) => {
    await delay(400); // 模拟网络延迟

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

    // 模拟发送重置密码邮件
    return HttpResponse.json({
      code: 200,
      message: '重置密码邮件已发送',
      data: {
        email: user.email,
        resetToken: `reset-token-${Date.now()}`,
      },
      success: true,
    });
  }),

  /**
   * 启用/禁用用户
   * PATCH /users/:id/status
   */
  http.patch('/users/:id/status', async ({ params, request }) => {
    await delay(300); // 模拟网络延迟

    const { id } = params;
    const body = (await request.json()) as { status: 'active' | 'inactive' };
    const { status } = body;

    const userIndex = mockUsers.findIndex(u => u.id === id);

    if (userIndex === -1) {
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

    // 检查是否为管理员用户
    if (mockUsers[userIndex].role === 'admin' && status === 'inactive') {
      return HttpResponse.json(
        {
          code: 403,
          message: '不能禁用管理员用户',
          data: null,
          success: false,
        },
        { status: 403 }
      );
    }

    // 更新用户状态
    const updatedUser: User = {
      ...mockUsers[userIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    mockUsers[userIndex] = updatedUser;

    return HttpResponse.json({
      code: 200,
      message: `用户已${status === 'active' ? '启用' : '禁用'}`,
      data: updatedUser,
      success: true,
    });
  }),
];
