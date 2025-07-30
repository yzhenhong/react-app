/*
 * @Author: yangzhenhong
 * @Date: 2025-07-30 15:45:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-30 16:04:09
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
            name: 'News',
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
        path: '/news',
        name: 'News',
        element: React.createElement(News),
        meta: {
          title: '新闻页面',
          layout: 'blank',
        },
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/welcome',
  },
];

/**
 * 渲染单个路由
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
        {route.children.map(child => renderChildRoute(child))}
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
 * 渲染子路由
 * @param child 子路由配置
 * @returns React 路由组件
 */
const renderChildRoute = (child: RouteConfig): React.ReactNode => {
  // 处理子路由的重定向
  if (child.redirect) {
    return (
      <Route
        key={child.name || child.path}
        path={child.path}
        element={<Navigate to={child.redirect} replace />}
      />
    );
  }

  // 处理有子路由的子路由
  if (child.children && child.children.length > 0) {
    return (
      <Route
        key={child.name || child.path}
        path={child.path}
        element={child.element}
      >
        {child.children.map(grandChild => renderGrandChildRoute(grandChild))}
      </Route>
    );
  }

  // 处理普通子路由
  return (
    <Route
      key={child.name || child.path}
      path={child.path}
      element={child.element}
    />
  );
};

/**
 * 渲染孙路由
 * @param grandChild 孙路由配置
 * @returns React 路由组件
 */
const renderGrandChildRoute = (grandChild: RouteConfig): React.ReactNode => {
  // 处理孙路由的重定向
  if (grandChild.redirect) {
    return (
      <Route
        key={grandChild.name || grandChild.path}
        path={grandChild.path}
        element={<Navigate to={grandChild.redirect} replace />}
      />
    );
  }

  // 处理普通孙路由
  return (
    <Route
      key={grandChild.name || grandChild.path}
      path={grandChild.path}
      element={grandChild.element}
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
