/*
 * @Author: yangzhenhong
 * @Date: 2025-08-04 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-04 10:00:00
 * @FilePath: \react-app\src\mock\handlers\index.ts
 * @Description: Mock 处理器主入口文件
 */

import { loginHandlers } from './login';
import { userHandlers } from './user';
import { articleHandlers } from './article';

/**
 * 整合所有 Mock 处理器
 * 按模块组织，便于管理和维护
 */
export const handlers = [
  // 登录模块 Mock 处理器
  ...loginHandlers,

  // 用户管理模块 Mock 处理器
  ...userHandlers,

  // 文章管理模块 Mock 处理器
  ...articleHandlers,
];
