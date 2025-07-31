/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\config.ts
 * @Description: Axios 配置文件
 */

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { message } from 'antd';

// API 响应数据接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  // 基础 URL，根据环境变量设置
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',

  // 请求超时时间
  timeout: 10000,

  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },

  // 是否携带凭证
  withCredentials: true,
});

/**
 * 请求拦截器
 * 在发送请求之前做些什么
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');

    // 如果有 token，添加到请求头
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 开发环境下打印请求信息
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        params: config.params,
      });
    }

    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 对响应数据做点什么
 */
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 开发环境下打印响应信息
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    // 如果响应成功，直接返回数据
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    return response;
  },
  error => {
    // 开发环境下打印错误信息
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // 处理不同类型的错误
    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          localStorage.removeItem('token');
          message.error('登录已过期，请重新登录');
          // 这里可以触发登录跳转逻辑
          break;

        case 403:
          message.error('没有权限访问该资源');
          break;

        case 404:
          message.error('请求的资源不存在');
          break;

        case 500:
          message.error('服务器内部错误');
          break;

        default:
          message.error(data?.message || '请求失败');
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message.error('网络连接失败，请检查网络设置');
    } else {
      // 请求配置有误
      message.error('请求配置错误');
    }

    return Promise.reject(error);
  }
);

export { api };
