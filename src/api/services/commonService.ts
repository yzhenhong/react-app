/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\services\commonService.ts
 * @Description: 通用 API 服务
 */

import { api, ApiResponse } from '@/api/config';

/**
 * 通用 GET 请求
 * @param url 请求地址
 * @param params 查询参数
 * @returns 响应数据
 */
export const get = async <T = any>(
  url: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get<ApiResponse<T>>(url, { params });
    return response.data;
  } catch (error) {
    console.error(`GET 请求失败 ${url}:`, error);
    throw error;
  }
};

/**
 * 通用 POST 请求
 * @param url 请求地址
 * @param data 请求数据
 * @returns 响应数据
 */
export const post = async <T = any>(
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    console.error(`POST 请求失败 ${url}:`, error);
    throw error;
  }
};

/**
 * 通用 PUT 请求
 * @param url 请求地址
 * @param data 请求数据
 * @returns 响应数据
 */
export const put = async <T = any>(
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.put<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    console.error(`PUT 请求失败 ${url}:`, error);
    throw error;
  }
};

/**
 * 通用 DELETE 请求
 * @param url 请求地址
 * @returns 响应数据
 */
export const del = async <T = any>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error) {
    console.error(`DELETE 请求失败 ${url}:`, error);
    throw error;
  }
};

/**
 * 通用 PATCH 请求
 * @param url 请求地址
 * @param data 请求数据
 * @returns 响应数据
 */
export const patch = async <T = any>(
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.patch<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    console.error(`PATCH 请求失败 ${url}:`, error);
    throw error;
  }
};

/**
 * 文件上传
 * @param url 上传地址
 * @param file 文件对象
 * @param onProgress 上传进度回调
 * @returns 响应数据
 */
export const uploadFile = async <T = any>(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<ApiResponse<T>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  } catch (error) {
    console.error(`文件上传失败 ${url}:`, error);
    throw error;
  }
};

/**
 * 批量文件上传
 * @param url 上传地址
 * @param files 文件数组
 * @param onProgress 上传进度回调
 * @returns 响应数据
 */
export const uploadFiles = async <T = any>(
  url: string,
  files: File[],
  onProgress?: (progress: number) => void
): Promise<ApiResponse<T>> => {
  try {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const response = await api.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  } catch (error) {
    console.error(`批量文件上传失败 ${url}:`, error);
    throw error;
  }
};
