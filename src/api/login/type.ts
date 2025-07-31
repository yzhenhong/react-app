/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\login\type.ts
 * @Description: 登录模块类型定义
 */

/**
 * 用户信息接口
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

/**
 * 登录请求参数
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

/**
 * 注册请求参数
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * 更新用户信息请求参数
 */
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

/**
 * 重置密码请求参数
 */
export interface ResetPasswordRequest {
  email: string;
}

/**
 * 修改密码请求参数
 */
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * 验证邮箱请求参数
 */
export interface VerifyEmailRequest {
  email: string;
  code: string;
}

/**
 * 发送验证码请求参数
 */
export interface SendVerificationCodeRequest {
  email: string;
  type: 'login' | 'register' | 'reset';
}
