/**
 * 应用程序根组件
 *
 * 主要功能：
 * - 提供应用程序的根容器
 * - 集成路由系统
 * - 集成 Redux 状态管理
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import AppRouter from '@/router';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
