/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 16:32:40
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 16:33:07
 * @FilePath: \react-app\src\store\index.ts
 * @Description:
 */
/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 16:32:40
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 16:32:59
 * @FilePath: \react-app\src\store\index.ts
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import counterReducer from './slices/counterSlice';

/**
 * Redux Store 配置
 *
 * 主要功能：
 * - 配置 Redux Store
 * - 注册 Reducer
 * - 配置开发工具
 */

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
  },
  // 开发环境配置
  devTools: process.env.NODE_ENV !== 'production',
});

// 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
