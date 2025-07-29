import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.less';

/**
 * 导航组件
 *
 * 主要功能：
 * - 提供页面导航链接
 * - 显示当前页面状态
 * - 响应式导航设计
 */

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className='nav-container'>
      <div className='nav-brand'>
        <Link to='/welcome'>React App</Link>
      </div>

      <ul className='nav-menu'>
        <li
          className={`nav-item ${location.pathname === '/welcome' ? 'active' : ''}`}
        >
          <Link to='/welcome'>欢迎</Link>
        </li>
        <li
          className={`nav-item ${location.pathname === '/news' ? 'active' : ''}`}
        >
          <Link to='/news'>新闻</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
