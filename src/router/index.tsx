/*
 * @Author: yangzhenhong
 * @Date: 2025-07-30 15:45:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-09-10 10:40:51
 * @FilePath: \react-app\src\router\index.tsx
 * @Description: 简化的路由配置 - 支持懒加载
 */

import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 布局组件 - 保持同步加载（因为布局组件通常较小且经常使用）
import LayoutDefault from '@/layout/default/default';
import LayoutBlank from '@/layout/blank/blank';

/**
 * 无加载状态的懒加载工具函数 - 类似 Vue Router 的写法
 * @param importFn 动态导入函数
 * @returns 懒加载组件
 */
const lazyLoad = (importFn: () => Promise<any>) => {
  const LazyComponent = lazy(importFn);
  // 直接返回组件，不显示加载状态
  return <LazyComponent />;
};

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
 * 路由配置数组（类似 Vue Router 格式，支持懒加载）
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
    element: <LayoutDefault />,
    meta: {
      layout: 'default',
    },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        element: lazyLoad(() => import('@/pages/welcome')),
        meta: {
          title: '欢迎页面',
          layout: 'default',
        },
        children: [
          {
            path: '/welcome/news',
            name: 'WelcomeNews',
            element: lazyLoad(() => import('@/pages/news')),
          },
        ],
      },
      {
        path: '/router-demo',
        name: 'RouterDemo',
        element: lazyLoad(() => import('@/components/RouterDemo')),
        meta: {
          title: '路由演示',
          layout: 'default',
        },
      },
      {
        path: '/layout-demo',
        name: 'LayoutDemo',
        element: lazyLoad(() => import('@/components/LayoutDemo')),
        meta: {
          title: '布局演示',
          layout: 'default',
        },
      },
      {
        path: '/i18n-demo',
        name: 'I18nDemo',
        element: lazyLoad(() => import('@/pages/i18n-demo')),
        meta: {
          title: '多语言演示',
          layout: 'default',
        },
      },
      {
        path: '/news',
        name: 'News',
        element: lazyLoad(() => import('@/pages/news')),
        meta: {
          title: '新闻页面',
          layout: 'default',
        },
      },
      {
        path: '/api-demo',
        name: 'ApiDemo',
        element: lazyLoad(() => import('@/components/ApiDemo')),
        meta: {
          title: 'API 演示',
          layout: 'default',
        },
      },
      {
        path: '/mock-demo',
        name: 'MockDemo',
        element: lazyLoad(() => import('@/pages/mock-demo')),
        meta: {
          title: 'Mock 数据演示',
          layout: 'default',
        },
      },
    ],
  },
  {
    path: '/',
    name: 'BlankLayout',
    element: <LayoutBlank />,
    meta: {
      layout: 'blank',
    },
    children: [
      {
        path: '/error',
        name: 'Error',
        element: lazyLoad(() => import('@/pages/error')),
        meta: {
          title: '错误页面',
          layout: 'blank',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    element: lazyLoad(() => import('@/pages/login')),
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
