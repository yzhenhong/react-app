/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 18:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-30 14:52:18
 * @FilePath: \react-app\src\components\RouterDemo\index.tsx
 * @Description: React Router 组件演示
 */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Space, Typography, Divider } from 'antd';
import './index.less';

const { Title, Paragraph, Text } = Typography;

/**
 * React Router 组件演示
 *
 * 这个组件展示了 React Router 中各个组件的使用方法：
 * - Link: 声明式导航
 * - useNavigate: 编程式导航
 * - useLocation: 获取当前路由信息
 */
const RouterDemo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 代码示例常量，避免 ESLint 引号转义警告
  const routeExample = '<Route path="路径" element={<组件 />} />';
  const navigateExample = '<Navigate to="目标路径" replace />';
  const defaultRouteExample =
    '<Route path="/" element={<Navigate to="/welcome" replace />} />';
  const wildcardRouteExample =
    '<Route path="*" element={<Navigate to="/welcome" replace />} />';

  // 编程式导航示例
  const handleNavigateToWelcome = () => {
    navigate('/welcome');
  };

  const handleNavigateToNews = () => {
    navigate('/news');
  };

  const handleGoBack = () => {
    navigate(-1); // 返回上一页
  };

  return (
    <div
      className='router-demo'
      style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}
    >
      <Title level={2}>React Router 组件演示</Title>

      {/* 当前路由信息 */}
      <Card title='当前路由信息' style={{ marginBottom: '20px' }}>
        <Paragraph>
          <Text strong>当前路径：</Text> {location.pathname}
        </Paragraph>
        <Paragraph>
          <Text strong>完整 URL：</Text>{' '}
          {location.pathname + location.search + location.hash}
        </Paragraph>
      </Card>

      {/* Link 组件演示 */}
      <Card title='Link 组件 - 声明式导航' style={{ marginBottom: '20px' }}>
        <Paragraph>
          Link 组件用于创建导航链接，用户点击时会跳转到指定页面。
          这是最常用的导航方式。
        </Paragraph>
        <Space>
          <Link to='/welcome'>
            <Button type='primary'>欢迎页面 (Link)</Button>
          </Link>
          <Link to='/news'>
            <Button type='primary'>新闻页面 (Link)</Button>
          </Link>
        </Space>
      </Card>

      {/* useNavigate 演示 */}
      <Card
        title='useNavigate Hook - 编程式导航'
        style={{ marginBottom: '20px' }}
      >
        <Paragraph>
          useNavigate Hook 允许在 JavaScript 代码中进行页面跳转，
          常用于表单提交后跳转、登录成功后跳转等场景。
        </Paragraph>
        <Space>
          <Button onClick={handleNavigateToWelcome}>
            跳转到欢迎页面 (useNavigate)
          </Button>
          <Button onClick={handleNavigateToNews}>
            跳转到新闻页面 (useNavigate)
          </Button>
          <Button onClick={handleGoBack}>返回上一页 (useNavigate)</Button>
        </Space>
      </Card>

      {/* 路由组件说明 */}
      <Card title='路由组件详细说明'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <div>
            <Title level={4}>BrowserRouter</Title>
            <Paragraph>
              <Text strong>作用：</Text>整个路由系统的容器，使用浏览器的 History
              API 管理 URL
            </Paragraph>
            <Paragraph>
              <Text strong>特点：</Text>URL 看起来像正常的网站地址，如
              http://localhost:3000/welcome
            </Paragraph>
          </div>

          <Divider />

          <div>
            <Title level={4}>Routes</Title>
            <Paragraph>
              <Text strong>作用：</Text>
              包含所有路由规则的容器，相当于应用的"路线图"
            </Paragraph>
            <Paragraph>
              <Text strong>特点：</Text>所有的 Route 组件都必须放在 Routes 里面
            </Paragraph>
          </div>

          <Divider />

          <div>
            <Title level={4}>Route</Title>
            <Paragraph>
              <Text strong>作用：</Text>
              定义具体的路由规则，指定"访问某个路径时显示哪个组件"
            </Paragraph>
            <Paragraph>
              <Text strong>语法：</Text> <Text code>{routeExample}</Text>
            </Paragraph>
          </div>

          <Divider />

          <div>
            <Title level={4}>Navigate</Title>
            <Paragraph>
              <Text strong>作用：</Text>自动跳转到指定路径，常用于默认路由和 404
              处理
            </Paragraph>
            <Paragraph>
              <Text strong>语法：</Text> <Text code>{navigateExample}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>特点：</Text>replace
              属性会替换当前历史记录，不会留下返回痕迹
            </Paragraph>
          </div>
        </Space>
      </Card>

      {/* 实际应用场景 */}
      <Card title='实际应用场景' style={{ marginTop: '20px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <div>
            <Title level={4}>1. 默认路由重定向</Title>
            <Paragraph>当用户访问网站根目录时，自动跳转到欢迎页面：</Paragraph>
            <Text code>{defaultRouteExample}</Text>
          </div>

          <Divider />

          <div>
            <Title level={4}>2. 404 页面处理</Title>
            <Paragraph>当用户访问不存在的路径时，重定向到默认页面：</Paragraph>
            <Text code>{wildcardRouteExample}</Text>
          </div>

          <Divider />

          <div>
            <Title level={4}>3. 登录后跳转</Title>
            <Paragraph>
              用户登录成功后，使用编程式导航跳转到目标页面：
            </Paragraph>
            <Text code>
              const navigate = useNavigate();{'\n'}
              navigate('/dashboard');
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default RouterDemo;
