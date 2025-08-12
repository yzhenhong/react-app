/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 11:49:57
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 10:00:41
 * @FilePath: \react-app\src\index.tsx
 * @Description:
 */
/**
 * 应用程序入口文件
 *
 * 主要功能：
 * - 渲染 React 应用根组件
 * - 导入全局样式
 * - 性能监控配置
 * - 多语言支持初始化
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '@/reportWebVitals';
import '@/assets/styles/index.less';
import '@/i18n'; // 导入 i18n 配置
import App from '@/App';

// 导入 Mock 服务
import { startMock } from '@/mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 启动 Mock 服务（仅在开发环境且启用 Mock 时）
startMock().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
