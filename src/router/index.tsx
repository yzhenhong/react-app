/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 16:25:51
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 17:29:26
 * @FilePath: \react-app\src\router\index.tsx
 * @Description:
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 页面
import Welcome from '@/pages/welcome';
import News from '@/pages/news';

/**
 * 路由配置
 *
 * 主要功能：
 * - 配置页面路由
 * - 处理默认重定向
 * - 支持嵌套路由
 */

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 默认路由重定向到欢迎页面 */}
        <Route path='/' element={<Navigate to='/welcome' replace />} />

        {/* 欢迎页面 */}
        <Route path='/welcome' element={<Welcome />} />

        {/* 新闻页面 */}
        <Route path='/news' element={<News />} />

        {/* 404 页面 - 重定向到欢迎页面 */}
        <Route path='*' element={<Navigate to='/welcome' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
