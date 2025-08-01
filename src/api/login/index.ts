/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\login\index.ts
 * @Description: 登录模块 API 请求方法
 */

import { post, get, put, del } from '@/api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UpdateUserRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  SendVerificationCodeRequest,
  User,
} from './type';

/**
 * 用户登录
 * POST /auth/login
 * @param data 登录信息
 * @returns 登录响应数据
 */
export const login = async (data: LoginRequest) => {
  return post<LoginResponse>('/auth/login', data);
};

/**
 * 用户注册
 * POST /auth/register
 * @param data 注册信息
 * @returns 注册响应数据
 */
export const register = async (data: RegisterRequest) => {
  return post<User>('/auth/register', data);
};

/**
 * 用户登出
 * POST /auth/logout
 * @returns 登出响应数据
 */
export const logout = async () => {
  return post<void>('/auth/logout');
};

/**
 * 获取当前用户信息
 * GET /auth/me
 * @returns 用户信息
 */
export const getCurrentUser = async () => {
  return get<User>('/auth/me');
};

/**
 * 更新用户信息
 * PUT /auth/profile
 * @param data 更新的用户信息
 * @returns 更新后的用户信息
 */
export const updateUser = async (data: UpdateUserRequest) => {
  return put<User>('/auth/profile', data);
};

/**
 * 上传用户头像
 * POST /auth/avatar
 * @param file 头像文件
 * @returns 头像URL
 */
export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  return post<{ avatarUrl: string }>('/auth/avatar', formData);
};

/**
 * 重置密码
 * POST /auth/reset-password
 * @param data 重置密码信息
 * @returns 重置密码响应
 */
export const resetPassword = async (data: ResetPasswordRequest) => {
  return post<void>('/auth/reset-password', data);
};

/**
 * 修改密码
 * PUT /auth/change-password
 * @param data 修改密码信息
 * @returns 修改密码响应
 */
export const changePassword = async (data: ChangePasswordRequest) => {
  return put<void>('/auth/change-password', data);
};

/**
 * 验证邮箱
 * POST /auth/verify-email
 * @param data 验证邮箱信息
 * @returns 验证邮箱响应
 */
export const verifyEmail = async (data: VerifyEmailRequest) => {
  return post<void>('/auth/verify-email', data);
};

/**
 * 发送验证码
 * POST /auth/send-verification-code
 * @param data 发送验证码信息
 * @returns 发送验证码响应
 */
export const sendVerificationCode = async (
  data: SendVerificationCodeRequest
) => {
  return post<void>('/auth/send-verification-code', data);
};

/**
 * 刷新访问令牌
 * POST /auth/refresh-token
 * @param refreshToken 刷新令牌
 * @returns 新的访问令牌
 */
export const refreshToken = async (refreshToken: string) => {
  return post<{ token: string; refreshToken: string }>('/auth/refresh-token', {
    refreshToken,
  });
};

/**
 * 删除用户账户
 * DELETE /auth/account
 * @returns 删除账户响应
 */
export const deleteAccount = async () => {
  return del<void>('/auth/account');
};
