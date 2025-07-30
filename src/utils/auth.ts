/*
 * @Author: yangzhenhong
 * @Date: 2025-07-30 15:33:32
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-30 15:34:03
 * @FilePath: \react-app\src\utils\auth.ts
 * @Description:
 */

export const isLogin = () => {
  return localStorage.getItem('token') ? true : false;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
