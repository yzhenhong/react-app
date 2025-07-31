/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 16:47:56
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 10:44:47
 * @FilePath: \react-app\src\components\Nav\index.tsx
 * @Description: 导航组件 - 支持多语言
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import './index.less';

/**
 * 导航组件
 *
 * 主要功能：
 * - 提供页面导航链接
 * - 显示当前页面状态
 * - 响应式导航设计
 * - 多语言支持
 */

const Navigation: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className='nav-container'>
      <div className='nav-brand'>
        <Link to='/welcome'>React App</Link>
      </div>

      <ul className='nav-menu'>
        <li
          className={`nav-item ${location.pathname === '/welcome' ? 'active' : ''}`}
        >
          <Link to='/welcome'>{t('nav.home')}</Link>
        </li>

        <li
          className={`nav-item ${location.pathname === '/welcome/news' ? 'active' : ''}`}
        >
          <Link to='/welcome/news'>{t('nav.welcomeNews')}</Link>
        </li>

        <li
          className={`nav-item ${location.pathname === '/router-demo' ? 'active' : ''}`}
        >
          <Link to='/router-demo'>{t('demo.router.title')}</Link>
        </li>

        <li
          className={`nav-item ${location.pathname === '/layout-demo' ? 'active' : ''}`}
        >
          <Link to='/layout-demo'>{t('demo.layout.title')}</Link>
        </li>

        <li
          className={`nav-item ${location.pathname === '/i18n-demo' ? 'active' : ''}`}
        >
          <Link to='/i18n-demo'>{t('language.switchLanguage')}</Link>
        </li>

        <li
          className={`nav-item ${location.pathname === '/news' ? 'active' : ''}`}
        >
          <Link to='/news'>{t('nav.news')}</Link>
        </li>
      </ul>

      <div className='nav-actions'>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navigation;
