/**
 * 应用程序根组件
 *
 * 主要功能：
 * - 提供应用程序的根容器
 * - 集成路由系统
 */

import React from 'react';
import AppRouter from '@/router';

function App() {
  return (
    <div className='App'>
      <AppRouter />
    </div>
  );
}

export default App;
