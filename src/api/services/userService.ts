/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\services\userService.ts
 * @Description: 用户相关 API 服务
 */

import { api, ApiResponse } from '@/api/config';

// 用户信息接口
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// 登录请求参数
export interface LoginRequest {
  email: string;
  password: string;
}

// 登录响应数据
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// 注册请求参数
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 更新用户信息请求参数
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

/**
 * 用户登录
 * @param data 登录信息
 * @returns 登录响应数据
 */
export const login = async (
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      data
    );
    return response.data;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

/**
 * 用户注册
 * @param data 注册信息
 * @returns 注册响应数据
 */
export const register = async (
  data: RegisterRequest
): Promise<ApiResponse<User>> => {
  try {
    const response = await api.post<ApiResponse<User>>('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('注册失败:', error);
    throw error;
  }
};

/**
 * 用户登出
 * @returns 登出响应数据
 */
export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    const response = await api.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('登出失败:', error);
    throw error;
  }
};

/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
};

/**
 * 更新用户信息
 * @param data 更新的用户信息
 * @returns 更新后的用户信息
 */
export const updateUser = async (
  data: UpdateUserRequest
): Promise<ApiResponse<User>> => {
  try {
    const response = await api.put<ApiResponse<User>>('/auth/profile', data);
    return response.data;
  } catch (error) {
    console.error('更新用户信息失败:', error);
    throw error;
  }
};

/**
 * 上传用户头像
 * @param file 头像文件
 * @returns 头像URL
 */
export const uploadAvatar = async (
  file: File
): Promise<ApiResponse<{ avatarUrl: string }>> => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<ApiResponse<{ avatarUrl: string }>>(
      '/auth/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('上传头像失败:', error);
    throw error;
  }
};

/**
 * 获取用户列表（管理员功能）
 * @param params 查询参数
 * @returns 用户列表
 */
export const getUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<ApiResponse<{ users: User[]; total: number }>> => {
  try {
    const response = await api.get<
      ApiResponse<{ users: User[]; total: number }>
    >('/users', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('获取用户列表失败:', error);
    throw error;
  }
};
