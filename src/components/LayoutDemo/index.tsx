/*
 * @Author: yangzhenhong
 * @Date: 2025-07-30 15:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-30 15:00:00
 * @FilePath: \react-app\src\components\LayoutDemo\index.tsx
 * @Description: 布局演示组件
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Typography, Space, Button, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

/**
 * 布局演示组件
 *
 * 这个组件展示了不同布局的效果和嵌套路由的工作原理
 */
const LayoutDemo: React.FC = () => {
  const location = useLocation();

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>布局系统演示</Title>

      <Card title='当前页面信息' style={{ marginBottom: '20px' }}>
        <Paragraph>
          <Text strong>当前路径：</Text> {location.pathname}
        </Paragraph>
        <Paragraph>
          <Text strong>当前布局：</Text>
          {location.pathname === '/news' ? '空白布局' : '默认布局'}
        </Paragraph>
      </Card>

      <Card title='布局说明' style={{ marginBottom: '20px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <div>
            <Title level={4}>默认布局 (LayoutDefault)</Title>
            <Paragraph>
              包含导航栏和页脚的完整布局，适用于需要完整页面结构的页面。
            </Paragraph>
            <Text code>使用页面：/welcome, /router-demo</Text>
          </div>

          <Divider />

          <div>
            <Title level={4}>空白布局 (LayoutBlank)</Title>
            <Paragraph>
              不包含导航栏和页脚的简洁布局，适用于全屏展示或特殊页面。
            </Paragraph>
            <Text code>使用页面：/news</Text>
          </div>
        </Space>
      </Card>

      <Card title='页面导航' style={{ marginBottom: '20px' }}>
        <Space>
          <Link to='/welcome'>
            <Button type='primary'>欢迎页面 (默认布局)</Button>
          </Link>
          <Link to='/news'>
            <Button type='primary' danger>
              新闻页面 (空白布局)
            </Button>
          </Link>
          <Link to='/router-demo'>
            <Button>路由演示 (默认布局)</Button>
          </Link>
        </Space>
      </Card>

      <Card title='嵌套路由工作原理'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <div>
            <Title level={4}>1. 路由结构</Title>
            <Paragraph>
              使用 React Router
              的嵌套路由功能，不同的页面组件被包裹在不同的布局组件中。
            </Paragraph>
          </div>

          <div>
            <Title level={4}>2. Outlet 组件</Title>
            <Paragraph>
              布局组件使用 Outlet 组件来渲染嵌套的子路由内容。
            </Paragraph>
          </div>

          <div>
            <Title level={4}>3. 布局切换</Title>
            <Paragraph>
              当用户访问不同的页面时，会自动应用对应的布局样式。
            </Paragraph>
          </div>

          <div>
            <Title level={4}>4. 代码示例</Title>
            <Paragraph>
              <Text code>
                {`<Route element={<LayoutDefault />}>
  <Route path="welcome" element={<Welcome />} />
</Route>

<Route element={<LayoutBlank />}>
  <Route path="news" element={<News />} />
</Route>`}
              </Text>
            </Paragraph>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default LayoutDemo;
