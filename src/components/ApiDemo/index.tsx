/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 15:56:20
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
  Alert,
  Spin,
} from 'antd';
import { UserOutlined, LockOutlined, ReloadOutlined } from '@ant-design/icons';
import { login, getCurrentUser } from '@/api/login';
import type { User, LoginRequest } from '@/api/login/type';
import { getUsers } from '@/api/user';
import { getArticles } from '@/api/article';

const { Title, Text } = Typography;

/**
 * API 演示组件
 *
 * 主要功能：
 * - 演示用户登录功能
 * - 演示获取用户信息功能
 * - 演示获取用户列表和文章列表
 * - 展示错误处理和加载状态
 * - 展示模块化API的使用方式
 */
const ApiDemo: React.FC = () => {
  const [form] = Form.useForm();

  // 登录相关状态
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // 用户信息相关状态
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [userInfoError, setUserInfoError] = useState<string | null>(null);

  // 用户列表相关状态
  const [usersData, setUsersData] = useState<any>(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  // 文章列表相关状态
  const [articlesData, setArticlesData] = useState<any>(null);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  /**
   * 处理用户登录
   */
  const handleLogin = async (values: LoginRequest) => {
    setLoginLoading(true);
    setLoginError(null);

    try {
      const response = await login(values);

      if (response.success) {
        // 保存 token 到 localStorage
        localStorage.setItem('token', response.data.token);
        message.success('登录成功！');

        // 获取用户信息
        await fetchUserInfo();
      } else {
        setLoginError(response.message || '登录失败，请检查邮箱和密码');
      }
    } catch (error) {
      console.error('登录失败:', error);
      setLoginError('登录失败，请检查网络连接');
    } finally {
      setLoginLoading(false);
    }
  };

  /**
   * 获取用户信息
   */
  const fetchUserInfo = async () => {
    setUserInfoLoading(true);
    setUserInfoError(null);

    try {
      const response = await getCurrentUser();

      if (response.success) {
        setUserInfo(response.data);
        message.success('获取用户信息成功！');
      } else {
        setUserInfoError(response.message || '获取用户信息失败');
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      setUserInfoError('获取用户信息失败');
    } finally {
      setUserInfoLoading(false);
    }
  };

  /**
   * 演示获取用户列表
   */
  const handleGetUsers = async () => {
    setUsersLoading(true);
    setUsersError(null);

    try {
      const response = await getUsers({ page: 1, limit: 10 });

      if (response.success) {
        setUsersData(response.data);
        message.success('获取用户列表成功！');
      } else {
        setUsersError(response.message || '获取用户列表失败');
      }
    } catch (error) {
      console.error('获取用户列表失败:', error);
      setUsersError('获取用户列表失败');
    } finally {
      setUsersLoading(false);
    }
  };

  /**
   * 演示获取文章列表
   */
  const handleGetArticles = async () => {
    setArticlesLoading(true);
    setArticlesError(null);

    try {
      const response = await getArticles({ page: 1, limit: 10 });

      if (response.success) {
        setArticlesData(response.data);
        message.success('获取文章列表成功！');
      } else {
        setArticlesError(response.message || '获取文章列表失败');
      }
    } catch (error) {
      console.error('获取文章列表失败:', error);
      setArticlesError('获取文章列表失败');
    } finally {
      setArticlesLoading(false);
    }
  };

  /**
   * 清除用户信息
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInfo(null);
    setUserInfoError(null);
    setUsersData(null);
    setArticlesData(null);
    message.success('已清除用户信息');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>🌐 模块化 API 演示</Title>
      <Text type='secondary'>
        这个组件演示了如何在 React 项目中使用模块化 API 进行数据交互
      </Text>

      <Divider />

      {/* 登录表单 */}
      <Card title='🔐 用户登录' style={{ marginBottom: '24px' }}>
        <Form
          form={form}
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
              loading={loginLoading}
              size='large'
              block
            >
              {loginLoading ? '登录中...' : '登录'}
            </Button>
          </Form.Item>
        </Form>

        {loginError && (
          <Alert
            message='登录错误'
            description={loginError}
            type='error'
            showIcon
            style={{ marginTop: '16px' }}
          />
        )}

        <Text type='secondary' style={{ display: 'block', marginTop: '16px' }}>
          提示：由于没有真实的后端服务，登录请求会失败，但你可以看到错误处理的效果
        </Text>
      </Card>

      {/* 用户信息显示 */}
      <Card title='👤 用户信息' style={{ marginBottom: '24px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Space>
            <Button
              onClick={fetchUserInfo}
              loading={userInfoLoading}
              type='primary'
              icon={<ReloadOutlined />}
            >
              获取用户信息
            </Button>
            <Button onClick={handleLogout} danger>
              清除用户信息
            </Button>
          </Space>

          {userInfoLoading && <Spin />}

          {userInfo && (
            <Card size='small' title='用户信息详情'>
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
            </Card>
          )}

          {userInfoError && (
            <Alert
              message='获取用户信息错误'
              description={userInfoError}
              type='error'
              showIcon
            />
          )}
        </Space>
      </Card>

      {/* API 测试 */}
      <Card title='🧪 API 测试' style={{ marginBottom: '24px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Text>点击下面的按钮测试不同的 API 请求：</Text>

          <Space>
            <Button
              onClick={handleGetUsers}
              loading={usersLoading}
              type='primary'
            >
              获取用户列表
            </Button>
            <Button
              onClick={handleGetArticles}
              loading={articlesLoading}
              type='primary'
            >
              获取文章列表
            </Button>
          </Space>

          {/* 用户列表结果 */}
          {usersData && (
            <Card size='small' title='📄 用户列表响应结果'>
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
                {JSON.stringify(usersData, null, 2)}
              </pre>
            </Card>
          )}

          {/* 文章列表结果 */}
          {articlesData && (
            <Card size='small' title='📄 文章列表响应结果'>
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
                {JSON.stringify(articlesData, null, 2)}
              </pre>
            </Card>
          )}

          {/* 错误信息 */}
          {(usersError || articlesError) && (
            <Alert
              message='API 请求错误'
              description={usersError || articlesError}
              type='error'
              showIcon
            />
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

          <Text strong>2. 模块化 API 服务</Text>
          <Text>
            在 <code>src/api/</code> 目录下按功能模块组织 API 接口：
          </Text>
          <ul>
            <li>
              <code>login/</code> - 登录认证相关 API
            </li>
            <li>
              <code>user/</code> - 用户管理相关 API
            </li>
            <li>
              <code>article/</code> - 文章管理相关 API
            </li>
          </ul>

          <Text strong>3. 在组件中使用</Text>
          <Text>在 React 组件中导入并使用模块化 API 服务：</Text>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            {`import { login, getCurrentUser } from '@/api/login';
              import { getUsers } from '@/api/user';
              import { getArticles } from '@/api/article';

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

          <Text strong>4. 状态管理</Text>
          <Text>使用 useState 管理加载状态、数据和错误信息：</Text>
          <ul>
            <li>为每个API调用使用独立的状态</li>
            <li>分别管理loading、data、error状态</li>
            <li>提供更好的用户体验</li>
          </ul>

          <Text strong>5. 错误处理</Text>
          <Text>
            所有 API 调用都应该使用 try-catch 包装，并使用 Alert
            组件显示错误信息。
          </Text>

          <Text strong>6. 优势</Text>
          <ul>
            <li>类型安全：完整的 TypeScript 支持</li>
            <li>模块化：按功能组织 API</li>
            <li>简洁：直接调用，无需额外的 Hook</li>
            <li>灵活：可以完全控制状态管理</li>
          </ul>
        </Space>
      </Card>
    </div>
  );
};

export default ApiDemo;
