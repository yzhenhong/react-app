/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 11:49:57
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-09-09 14:27:40
 * @FilePath: \react-app\src\App.tsx
 * @Description:
 */
/**
 * 应用程序根组件
 *
 * 主要功能：
 * - 提供应用程序的根容器
 * - 集成路由系统
 * - 集成 Redux 状态管理
 */

import { Provider } from 'react-redux';
import { store } from '@/store';
import AppRouter from '@/router';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
