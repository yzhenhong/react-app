/*
 * @Author: yangzhenhong
 * @Date: 2025-07-30 15:45:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 14:53:00
 * @FilePath: \react-app\src\router\router.tsx
 * @Description: 简化的路由配置
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 布局组件
import LayoutDefault from '@/layout/default/default';
import LayoutBlank from '@/layout/blank/blank';

// 页面组件
import Welcome from '@/pages/welcome';
import News from '@/pages/news';
import RouterDemo from '@/components/RouterDemo';
import LayoutDemo from '@/components/LayoutDemo';
import Login from '@/pages/login';
import I18nDemo from '@/pages/i18n-demo';
import Error from '@/pages/error';
import ApiDemo from '@/components/ApiDemo';

/**
 * 路由配置接口
 */
export interface RouteConfig {
  path: string;
  name?: string;
  element?: React.ReactNode;
  redirect?: string;
  children?: RouteConfig[];
  meta?: {
    requiresAuth?: boolean;
    title?: string;
    layout?: 'default' | 'blank';
  };
}

/**
 * 路由配置数组（类似 Vue Router 格式）
 */
export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/welcome',
  },
  {
    path: '/',
    name: 'DefaultLayout',
    element: React.createElement(LayoutDefault),
    meta: {
      layout: 'default',
    },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        element: React.createElement(Welcome),
        meta: {
          title: '欢迎页面',
          layout: 'default',
        },
        children: [
          {
            path: '/welcome/news',
            name: 'WelcomeNews',
            element: React.createElement(News),
          },
        ],
      },
      {
        path: '/router-demo',
        name: 'RouterDemo',
        element: React.createElement(RouterDemo),
        meta: {
          title: '路由演示',
          layout: 'default',
        },
      },
      {
        path: '/layout-demo',
        name: 'LayoutDemo',
        element: React.createElement(LayoutDemo),
        meta: {
          title: '布局演示',
          layout: 'default',
        },
      },
      {
        path: '/i18n-demo',
        name: 'I18nDemo',
        element: React.createElement(I18nDemo),
        meta: {
          title: '多语言演示',
          layout: 'default',
        },
      },
      {
        path: '/news',
        name: 'News',
        element: React.createElement(News),
        meta: {
          title: '多语言演示',
          layout: 'default',
        },
      },
      {
        path: '/api-demo',
        name: 'ApiDemo',
        element: React.createElement(ApiDemo),
        meta: {
          title: 'API 演示',
          layout: 'default',
        },
      },
    ],
  },
  {
    path: '/',
    name: 'BlankLayout',
    element: React.createElement(LayoutBlank),
    meta: {
      layout: 'blank',
    },
    children: [
      {
        path: '/error',
        name: 'Error',
        element: React.createElement(Error),
        meta: {
          title: '新闻页面',
          layout: 'blank',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    element: React.createElement(Login),
    meta: {
      title: '登录页面',
      layout: 'default',
    },
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/welcome',
  },
];

/**
 * 递归渲染路由（支持任意深度嵌套）
 * @param route 路由配置
 * @returns React 路由组件
 */
const renderRoute = (route: RouteConfig): React.ReactNode => {
  // 处理重定向路由
  if (route.redirect) {
    return (
      <Route
        key={route.name || route.path}
        path={route.path}
        element={<Navigate to={route.redirect} replace />}
      />
    );
  }

  // 处理有子路由的路由
  if (route.children && route.children.length > 0) {
    return (
      <Route
        key={route.name || route.path}
        path={route.path}
        element={route.element}
      >
        {route.children.map(child => renderRoute(child))}
      </Route>
    );
  }

  // 处理普通路由
  return (
    <Route
      key={route.name || route.path}
      path={route.path}
      element={route.element}
    />
  );
};

/**
 * 主路由组件
 */
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>{routes.map(route => renderRoute(route))}</Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
