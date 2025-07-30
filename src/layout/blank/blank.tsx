/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 17:10:50
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-30 15:14:30
 * @FilePath: \react-app\src\layout\blank\blank.tsx
 * @Description:
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import './blank.less';

interface LayoutBlankProps {
  children?: React.ReactNode;
}

const LayoutBlank: React.FC<LayoutBlankProps> = ({ children }) => {
  return (
    <div className='layout-blank'>
      <main className='layout-content'>
        {/* 使用 Outlet 渲染嵌套路由的子组件 */}
        <Outlet />
        {/* 如果没有嵌套路由，则渲染 children */}
        {children}
      </main>
    </div>
  );
};

export default LayoutBlank;
