/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 15:15:43
 * @FilePath: \react-app\src\api\user\type.ts
 * @Description: 用户管理模块类型定义
 */

/**
 * 用户信息接口
 */
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

/**
 * 用户列表查询参数
 */
export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'user' | 'admin' | 'moderator';
  status?: 'active' | 'inactive';
  sortBy?: 'name' | 'email' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * 用户列表响应数据
 */
export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * 创建用户请求参数
 */
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin' | 'moderator';
}

/**
 * 更新用户请求参数
 */
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'user' | 'admin' | 'moderator';
  status?: 'active' | 'inactive';
}

/**
 * 用户统计信息
 */
export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  roleStats: Record<string, number>;
}
