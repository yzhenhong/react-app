/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\user\index.ts
 * @Description: 用户管理模块 API 请求方法
 */

import { get, post, put, del } from '@/api';
import type { ApiResponse } from '@/api';
import type {
  User,
  UserListParams,
  UserListResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UserStats,
} from './type';

/**
 * 获取用户列表
 * GET /users
 * @param params 查询参数
 * @returns 用户列表
 */
export const getUsers = async (
  params?: UserListParams
): Promise<ApiResponse<UserListResponse>> => {
  return get<UserListResponse>('/users', params);
};

/**
 * 获取单个用户信息
 * GET /users/:id
 * @param id 用户ID
 * @returns 用户信息
 */
export const getUser = async (id: string): Promise<ApiResponse<User>> => {
  return get<User>(`/users/${id}`);
};

/**
 * 创建用户
 * POST /users
 * @param data 用户信息
 * @returns 创建的用户信息
 */
export const createUser = async (
  data: CreateUserRequest
): Promise<ApiResponse<User>> => {
  return post<User>('/users', data);
};

/**
 * 更新用户信息
 * PUT /users/:id
 * @param id 用户ID
 * @param data 更新的用户信息
 * @returns 更新后的用户信息
 */
export const updateUser = async (
  id: string,
  data: UpdateUserRequest
): Promise<ApiResponse<User>> => {
  return put<User>(`/users/${id}`, data);
};

/**
 * 删除用户
 * DELETE /users/:id
 * @param id 用户ID
 * @returns 删除响应
 */
export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
  return del<void>(`/users/${id}`);
};

/**
 * 批量删除用户
 * DELETE /users/batch?ids=1,2,3
 * @param ids 用户ID数组
 * @returns 批量删除响应
 */
export const batchDeleteUsers = async (
  ids: string[]
): Promise<ApiResponse<void>> => {
  const idsParam = ids.join(',');
  return del<void>(`/users/batch?ids=${idsParam}`);
};

/**
 * 获取用户统计信息
 * GET /users/stats
 * @returns 用户统计信息
 */
export const getUserStats = async (): Promise<ApiResponse<UserStats>> => {
  return get<UserStats>('/users/stats');
};

/**
 * 激活用户
 * PUT /users/:id/activate
 * @param id 用户ID
 * @returns 激活响应
 */
export const activateUser = async (id: string): Promise<ApiResponse<User>> => {
  return put<User>(`/users/${id}/activate`);
};

/**
 * 停用用户
 * PUT /users/:id/deactivate
 * @param id 用户ID
 * @returns 停用响应
 */
export const deactivateUser = async (
  id: string
): Promise<ApiResponse<User>> => {
  return put<User>(`/users/${id}/deactivate`);
};

/**
 * 封禁用户
 * PUT /users/:id/ban
 * @param id 用户ID
 * @param reason 封禁原因
 * @returns 封禁响应
 */
export const banUser = async (
  id: string,
  reason?: string
): Promise<ApiResponse<User>> => {
  return put<User>(`/users/${id}/ban`, { reason });
};

/**
 * 解封用户
 * PUT /users/:id/unban
 * @param id 用户ID
 * @returns 解封响应
 */
export const unbanUser = async (id: string): Promise<ApiResponse<User>> => {
  return put<User>(`/users/${id}/unban`);
};

/**
 * 重置用户密码
 * PUT /users/:id/reset-password
 * @param id 用户ID
 * @returns 重置密码响应
 */
export const resetUserPassword = async (
  id: string
): Promise<ApiResponse<{ newPassword: string }>> => {
  return put<{ newPassword: string }>(`/users/${id}/reset-password`);
};

/**
 * 导出用户数据
 * GET /users/export
 * @param params 导出参数
 * @returns 导出文件URL
 */
export const exportUsers = async (
  params?: UserListParams
): Promise<ApiResponse<{ downloadUrl: string }>> => {
  return get<{ downloadUrl: string }>('/users/export', params);
};
