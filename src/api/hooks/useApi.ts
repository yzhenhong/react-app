/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\hooks\useApi.ts
 * @Description: API 自定义 Hook
 */

import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { ApiResponse } from '@/api/config';

/**
 * API 调用状态
 */
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * 自定义 Hook：简化 API 调用
 *
 * @param apiFunction API 函数
 * @param options 配置选项
 * @returns API 调用状态和执行函数
 */
export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: {
    showError?: boolean; // 是否显示错误消息
    showSuccess?: boolean; // 是否显示成功消息
    successMessage?: string; // 成功消息
    errorMessage?: string; // 错误消息
    onSuccess?: (data: T) => void; // 成功回调
    onError?: (error: any) => void; // 错误回调
  } = {}
) {
  const {
    showError = true,
    showSuccess = false,
    successMessage = '操作成功',
    errorMessage = '操作失败',
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * 执行 API 调用
   */
  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args);

        if (response.success) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });

          if (showSuccess) {
            message.success(successMessage);
          }

          if (onSuccess) {
            onSuccess(response.data);
          }

          return response.data;
        } else {
          const errorMsg = response.message || errorMessage;
          setState({
            data: null,
            loading: false,
            error: errorMsg,
          });

          if (showError) {
            message.error(errorMsg);
          }

          if (onError) {
            onError(new Error(errorMsg));
          }

          return null;
        }
      } catch (error: any) {
        const errorMsg = error.message || errorMessage;
        setState({
          data: null,
          loading: false,
          error: errorMsg,
        });

        if (showError) {
          message.error(errorMsg);
        }

        if (onError) {
          onError(error);
        }

        return null;
      }
    },
    [
      apiFunction,
      showError,
      showSuccess,
      successMessage,
      errorMessage,
      onSuccess,
      onError,
    ]
  );

  /**
   * 重置状态
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * 自定义 Hook：用于数据获取
 *
 * @param apiFunction API 函数
 * @param options 配置选项
 * @returns 数据获取状态和执行函数
 */
export function useFetch<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: {
    immediate?: boolean; // 是否立即执行
    showError?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
  } = {}
) {
  const { immediate = false, ...apiOptions } = options;
  const apiResult = useApi(apiFunction, apiOptions);

  // 如果设置了立即执行，在组件挂载时自动调用
  useEffect(() => {
    if (immediate) {
      apiResult.execute();
    }
  }, [immediate, apiResult.execute]);

  return apiResult;
}

/**
 * 自定义 Hook：用于数据提交
 *
 * @param apiFunction API 函数
 * @param options 配置选项
 * @returns 提交状态和执行函数
 */
export function useSubmit<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: {
    showSuccess?: boolean;
    showError?: boolean;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
  } = {}
) {
  return useApi(apiFunction, {
    showSuccess: true,
    showError: true,
    successMessage: '提交成功',
    errorMessage: '提交失败',
    ...options,
  });
}
