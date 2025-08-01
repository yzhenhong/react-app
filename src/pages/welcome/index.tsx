/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 16:14:37
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-01 14:01:10
 * @FilePath: \react-app\src\pages\welcome\index.tsx
 * @Description: 欢迎页面 - 支持多语言
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Counter from '@/components/Counter';
import './index.less';

interface WelcomeProps {
  children?: React.ReactNode;
}

const Welcome: React.FC<WelcomeProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className='welcome-page'>
      <h1>{t('pages.welcome.title')}</h1>
      <p>{t('pages.welcome.subtitle')}</p>
      <p>{t('pages.welcome.description')}</p>
      <Counter />
      {/* 使用 Outlet 渲染嵌套路由的子组件 */}
      <div className='welcome-page-outlet'>
        <Outlet />
      </div>
      {/* 如果没有嵌套路由，则渲染 children */}
      <div className='welcome-page-children'>{children}</div>
    </div>
  );
};

export default Welcome;
