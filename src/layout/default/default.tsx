/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 17:10:50
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 17:28:47
 * @FilePath: \react-app\src\layout\default.tsx
 * @Description:
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './default.less';

interface LayoutDefaultProps {
  children?: React.ReactNode;
}

const LayoutDefault: React.FC<LayoutDefaultProps> = ({ children }) => {
  return (
    <div className='layout-default'>
      <Nav />
      <main className='layout-content'>
        {/* 使用 Outlet 渲染嵌套路由的子组件 */}
        <Outlet />
        {/* 如果没有嵌套路由，则渲染 children */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutDefault;
