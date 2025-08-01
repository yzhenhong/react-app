/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-01 13:57:39
 * @FilePath: \react-app\src\api\personal-share\index.ts
 * @Description: 用户管理模块 API 请求方法
 */

import { get } from '@/api';
import type { PersonalData } from './type';
export const getPersonalShareDetail = async (id: string) => {
  return get<PersonalData>(`/user/home/user/info/${id}`);
};
