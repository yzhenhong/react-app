/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\components\ApiDemo\index.tsx
 * @Description: API 演示组件
 */

import React, { useState } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  message,
  Space,
  Typography,
  Divider,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  login,
  getCurrentUser,
  User,
  LoginRequest,
} from '@/api/services/userService';
import { get, post } from '@/api/services/commonService';

const { Title, Text } = Typography;

/**
 * API 演示组件
 *
 * 主要功能：
 * - 演示用户登录功能
 * - 演示获取用户信息功能
 * - 演示通用 API 调用功能
 * - 展示错误处理和加载状态
 */
const ApiDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [apiResult, setApiResult] = useState<string>('');

  /**
   * 处理用户登录
   */
  const handleLogin = async (values: LoginRequest) => {
    setLoading(true);
    try {
      // 模拟登录请求
      const response = await login(values);

      if (response.success) {
        // 保存 token 到 localStorage
        localStorage.setItem('token', response.data.token);
        message.success('登录成功！');

        // 获取用户信息
        await fetchUserInfo();
      } else {
        message.error(response.message || '登录失败');
      }
    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取用户信息
   */
  const fetchUserInfo = async () => {
    try {
      const response = await getCurrentUser();

      if (response.success) {
        setUserInfo(response.data);
        message.success('获取用户信息成功！');
      } else {
        message.error(response.message || '获取用户信息失败');
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      message.error('获取用户信息失败');
    }
  };

  /**
   * 演示通用 GET 请求
   */
  const handleGetRequest = async () => {
    setLoading(true);
    try {
      // 模拟 GET 请求
      const response = await get('/demo/data');
      setApiResult(JSON.stringify(response, null, 2));
      message.success('GET 请求成功！');
    } catch (error) {
      console.error('GET 请求失败:', error);
      message.error('GET 请求失败');
      setApiResult('请求失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 演示通用 POST 请求
   */
  const handlePostRequest = async () => {
    setLoading(true);
    try {
      // 模拟 POST 请求
      const response = await post('/demo/create', {
        name: '测试数据',
        description: '这是一个测试请求',
        timestamp: new Date().toISOString(),
      });
      setApiResult(JSON.stringify(response, null, 2));
      message.success('POST 请求成功！');
    } catch (error) {
      console.error('POST 请求失败:', error);
      message.error('POST 请求失败');
      setApiResult('请求失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 清除用户信息
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInfo(null);
    setApiResult('');
    message.success('已清除用户信息');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>🌐 Axios API 演示</Title>
      <Text type='secondary'>
        这个组件演示了如何在 React 项目中使用 Axios 进行 API 调用
      </Text>

      <Divider />

      {/* 登录表单 */}
      <Card title='🔐 用户登录' style={{ marginBottom: '24px' }}>
        <Form
          name='login'
          onFinish={handleLogin}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            name='email'
            label='邮箱'
            rules={[
              { required: true, message: '请输入邮箱！' },
              { type: 'email', message: '请输入有效的邮箱地址！' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder='请输入邮箱'
              size='large'
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='密码'
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='请输入密码'
              size='large'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              size='large'
              block
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </Form.Item>
        </Form>

        <Text type='secondary'>
          提示：由于没有真实的后端服务，登录请求会失败，但你可以看到错误处理的效果
        </Text>
      </Card>

      {/* 用户信息显示 */}
      {userInfo && (
        <Card title='👤 用户信息' style={{ marginBottom: '24px' }}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Text>
              <strong>ID:</strong> {userInfo.id}
            </Text>
            <Text>
              <strong>姓名:</strong> {userInfo.name}
            </Text>
            <Text>
              <strong>邮箱:</strong> {userInfo.email}
            </Text>
            <Text>
              <strong>角色:</strong> {userInfo.role}
            </Text>
            <Text>
              <strong>创建时间:</strong> {userInfo.createdAt}
            </Text>
          </Space>

          <Divider />

          <Space>
            <Button onClick={fetchUserInfo} loading={loading}>
              刷新用户信息
            </Button>
            <Button onClick={handleLogout} danger>
              清除用户信息
            </Button>
          </Space>
        </Card>
      )}

      {/* API 测试 */}
      <Card title='🧪 API 测试' style={{ marginBottom: '24px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Text>点击下面的按钮测试不同的 API 请求：</Text>

          <Space>
            <Button onClick={handleGetRequest} loading={loading} type='primary'>
              测试 GET 请求
            </Button>
            <Button
              onClick={handlePostRequest}
              loading={loading}
              type='primary'
            >
              测试 POST 请求
            </Button>
          </Space>

          {apiResult && (
            <Card title='📄 API 响应结果' size='small'>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  overflow: 'auto',
                  maxHeight: '200px',
                }}
              >
                {apiResult}
              </pre>
            </Card>
          )}
        </Space>
      </Card>

      {/* 使用说明 */}
      <Card title='📖 使用说明' style={{ marginBottom: '24px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Text strong>1. 基础配置</Text>
          <Text>
            在 <code>src/api/config.ts</code> 中配置了 Axios 实例，包括：
          </Text>
          <ul>
            <li>基础 URL 设置</li>
            <li>请求超时时间</li>
            <li>请求和响应拦截器</li>
            <li>统一错误处理</li>
          </ul>

          <Text strong>2. API 服务</Text>
          <Text>
            在 <code>src/api/services/</code> 目录下按功能模块组织 API 接口：
          </Text>
          <ul>
            <li>
              <code>userService.ts</code> - 用户相关 API
            </li>
            <li>
              <code>commonService.ts</code> - 通用 API 方法
            </li>
          </ul>

          <Text strong>3. 在组件中使用</Text>
          <Text>在 React 组件中导入并使用 API 服务：</Text>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            {`import { login, getCurrentUser } from '@/api/services/userService';

const handleLogin = async (values) => {
  try {
    const response = await login(values);
    if (response.success) {
      // 处理成功响应
    }
  } catch (error) {
    // 处理错误
  }
};`}
          </pre>

          <Text strong>4. 错误处理</Text>
          <Text>
            所有 API 调用都应该使用 try-catch
            包装，并在组件中显示适当的错误信息。
          </Text>

          <Text strong>5. 加载状态</Text>
          <Text>使用 useState 管理加载状态，在请求期间显示加载指示器。</Text>
        </Space>
      </Card>
    </div>
  );
};

export default ApiDemo;
