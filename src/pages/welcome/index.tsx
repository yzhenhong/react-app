/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 16:14:37
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-30 15:17:54
 * @FilePath: \react-app\src\pages\welcome\index.tsx
 * @Description:
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Counter from '@/components/Counter';
import './index.less';

interface WelcomeProps {
  children?: React.ReactNode;
}

const Welcome: React.FC<WelcomeProps> = ({ children }) => {
  return (
    <div className='welcome-page'>
      <h1>欢迎页面</h1>
      <p>这是欢迎页面的内容</p>
      <Counter />
      {/* 使用 Outlet 渲染嵌套路由的子组件 */}
      <Outlet />
      {/* 如果没有嵌套路由，则渲染 children */}
      {children}
    </div>
  );
};

export default Welcome;
