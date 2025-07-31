/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 14:47:29
 * @FilePath: \react-app\src\components\ApiDemoWithHooks\index.tsx
 * @Description: 使用自定义 Hook 的 API 演示组件
 */

import React from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Space,
  Typography,
  Divider,
  Alert,
} from 'antd';
import { UserOutlined, LockOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  login,
  getCurrentUser,
  User,
  LoginRequest,
} from '@/api/services/userService';
import { get, post } from '@/api/services/commonService';
import { useApi, useFetch, useSubmit } from '@/api/hooks/useApi';

const { Title, Text } = Typography;

/**
 * 使用自定义 Hook 的 API 演示组件
 */
const ApiDemoWithHooks: React.FC = () => {
  const [form] = Form.useForm();

  // 使用 useSubmit Hook 处理登录
  const loginSubmit = useSubmit<{ user: User; token: string }>(login, {
    successMessage: '登录成功！',
    errorMessage: '登录失败，请检查邮箱和密码',
    onSuccess: data => {
      localStorage.setItem('token', data.token);
      form.resetFields();
      fetchUserInfo.execute();
    },
  });

  // 使用 useFetch Hook 获取用户信息
  const fetchUserInfo = useFetch<User>(getCurrentUser, {
    immediate: false,
    showError: true,
  });

  // 使用 useApi Hook 处理通用请求
  const getDataApi = useApi<{ message: string; data: any }>(get, {
    showError: true,
    errorMessage: '获取数据失败',
  });

  const postDataApi = useApi<{ message: string; data: any }>(post, {
    showSuccess: true,
    showError: true,
    successMessage: '数据提交成功！',
    errorMessage: '数据提交失败',
  });

  const handleLogin = (values: LoginRequest) => {
    loginSubmit.execute(values);
  };

  const handleFetchUserInfo = () => {
    fetchUserInfo.execute();
  };

  const handleGetData = () => {
    getDataApi.execute('/demo/data');
  };

  const handlePostData = () => {
    postDataApi.execute('/demo/create', {
      name: '测试数据',
      description: '使用 useApi Hook 提交的数据',
      timestamp: new Date().toISOString(),
    });
  };

  const handleClearUserInfo = () => {
    localStorage.removeItem('token');
    fetchUserInfo.reset();
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>🎣 自定义 Hook API 演示</Title>
      <Text type='secondary'>
        这个组件演示了如何使用自定义 Hook 来简化 API 调用
      </Text>

      <Divider />

      {/* 登录表单 - 使用 useSubmit */}
      <Card title='🔐 用户登录 (useSubmit)' style={{ marginBottom: '24px' }}>
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
              loading={loginSubmit.loading}
              size='large'
              block
            >
              {loginSubmit.loading ? '登录中...' : '登录'}
            </Button>
          </Form.Item>
        </Form>

        {loginSubmit.error && (
          <Alert
            message='登录错误'
            description={loginSubmit.error}
            type='error'
            showIcon
            style={{ marginTop: '16px' }}
          />
        )}
      </Card>

      {/* 用户信息 - 使用 useFetch */}
      <Card title='👤 用户信息 (useFetch)' style={{ marginBottom: '24px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Space>
            <Button
              onClick={handleFetchUserInfo}
              loading={fetchUserInfo.loading}
              icon={<ReloadOutlined />}
            >
              获取用户信息
            </Button>
            <Button onClick={handleClearUserInfo} danger>
              清除用户信息
            </Button>
          </Space>

          {fetchUserInfo.loading && (
            <Alert message='正在获取用户信息...' type='info' showIcon />
          )}

          {fetchUserInfo.error && (
            <Alert
              message='获取用户信息失败'
              description={fetchUserInfo.error}
              type='error'
              showIcon
            />
          )}

          {fetchUserInfo.data && (
            <Card size='small' title='用户信息详情'>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Text>
                  <strong>ID:</strong> {fetchUserInfo.data.id}
                </Text>
                <Text>
                  <strong>姓名:</strong> {fetchUserInfo.data.name}
                </Text>
                <Text>
                  <strong>邮箱:</strong> {fetchUserInfo.data.email}
                </Text>
                <Text>
                  <strong>角色:</strong> {fetchUserInfo.data.role}
                </Text>
                <Text>
                  <strong>创建时间:</strong> {fetchUserInfo.data.createdAt}
                </Text>
              </Space>
            </Card>
          )}
        </Space>
      </Card>

      {/* API 测试 - 使用 useApi */}
      <Card title='🧪 API 测试 (useApi)' style={{ marginBottom: '24px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Space>
            <Button
              onClick={handleGetData}
              loading={getDataApi.loading}
              type='primary'
            >
              测试 GET 请求
            </Button>
            <Button
              onClick={handlePostData}
              loading={postDataApi.loading}
              type='primary'
            >
              测试 POST 请求
            </Button>
          </Space>

          {/* GET 请求结果 */}
          {getDataApi.data && (
            <Card size='small' title='GET 请求结果'>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  overflow: 'auto',
                  maxHeight: '150px',
                }}
              >
                {JSON.stringify(getDataApi.data, null, 2)}
              </pre>
            </Card>
          )}

          {/* POST 请求结果 */}
          {postDataApi.data && (
            <Card size='small' title='POST 请求结果'>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  overflow: 'auto',
                  maxHeight: '150px',
                }}
              >
                {JSON.stringify(postDataApi.data, null, 2)}
              </pre>
            </Card>
          )}

          {/* 错误信息 */}
          {(getDataApi.error || postDataApi.error) && (
            <Alert
              message='API 请求错误'
              description={getDataApi.error || postDataApi.error}
              type='error'
              showIcon
            />
          )}
        </Space>
      </Card>

      {/* 使用说明 */}
      <Card title='📖 自定义 Hook 使用说明' style={{ marginBottom: '24px' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Text strong>1. useSubmit Hook</Text>
          <Text>用于处理表单提交等操作，自动显示成功/错误消息</Text>

          <Text strong>2. useFetch Hook</Text>
          <Text>用于数据获取，支持立即执行和手动触发</Text>

          <Text strong>3. useApi Hook</Text>
          <Text>最通用的 Hook，可以自定义所有行为</Text>

          <Text strong>4. Hook 的优势</Text>
          <ul>
            <li>自动管理加载状态</li>
            <li>统一错误处理</li>
            <li>减少重复代码</li>
            <li>提供类型安全</li>
            <li>支持自定义回调</li>
          </ul>
        </Space>
      </Card>
    </div>
  );
};

export default ApiDemoWithHooks;
