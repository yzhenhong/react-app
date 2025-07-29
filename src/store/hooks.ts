/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 16:33:16
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 16:34:04
 * @FilePath: \react-app\src\store\hooks.ts
 * @Description:
 */
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Redux Hooks 类型定义
 *
 * 主要功能：
 * - 提供类型安全的 Redux Hooks
 * - 简化 Redux 使用
 * - 提供更好的 TypeScript 支持
 */

// 使用类型化的 dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 使用类型化的 selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
