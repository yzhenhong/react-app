/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 17:10:50
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 09:33:47
 * @FilePath: \react-app\src\layout\blank\blank.tsx
 * @Description:
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import './blank.less';

interface LayoutBlankProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const LayoutBlank: React.FC<LayoutBlankProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <div className='layout-blank'>
      <main className='layout-content'>
        {/* 使用 Outlet 渲染嵌套路由的子组件 类似vue的router-view */}
        <Outlet />
        {/* 如果没有嵌套路由，则渲染 children  类似vue的slot */}
        {header && <header>{header}</header>}
        {children}
        {footer && <footer>{footer}</footer>}
      </main>
    </div>
  );
};

export default LayoutBlank;
