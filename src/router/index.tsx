/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 16:25:51
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-30 15:16:07
 * @FilePath: \react-app\src\router\index.tsx
 * @Description:
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 布局组件
import LayoutDefault from '@/layout/default/default';
import LayoutBlank from '@/layout/blank/blank';

// 页面
import Welcome from '@/pages/welcome';
import News from '@/pages/news';
import RouterDemo from '@/components/RouterDemo';
import LayoutDemo from '@/components/LayoutDemo';

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

        {/* 使用默认布局的路由组 */}
        <Route element={<LayoutDefault />}>
          <Route path='/welcome' element={<Welcome />}>
            <Route path='news' element={<News />} />
          </Route>
          <Route path='router-demo' element={<RouterDemo />} />
          <Route path='layout-demo' element={<LayoutDemo />} />
        </Route>

        {/* 使用空白布局的路由组 */}
        <Route element={<LayoutBlank />}>
          <Route path='news' element={<News />} />
        </Route>

        {/* 404 页面 - 重定向到欢迎页面 */}
        {/* <Route path='*' element={<Navigate to='/welcome' replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
