import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Card, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSubmit } from '@/api/hooks/useApi';
import { login } from '@/api/services/userService';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '@/store/slices/userSlice';
import './index.less';

import LayoutBlank from '@/layout/blank/blank';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // 使用自定义 Hook 处理登录
  const loginSubmit = useSubmit(login, {
    successMessage: '登录成功！',
    errorMessage: '登录失败，请检查邮箱和密码',
    onSuccess: data => {
      // 保存 token
      localStorage.setItem('token', data.token);

      // 更新 Redux 状态
      dispatch(
        loginAction({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          avatar: data.user.avatar || '',
          role: data.user.role,
        })
      );

      // 跳转到欢迎页面
      navigate('/welcome');
    },
  });

  const handleLogin = (values: { email: string; password: string }) => {
    loginSubmit.execute(values);
  };

  const header = (
    <header className='login-header'>{t('pages.login.title')}</header>
  );
  const footer = <footer className='login-footer'>{t('common.submit')}</footer>;

  return (
    <LayoutBlank header={header} footer={footer}>
      <div className='login-page'>
        <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Title
            level={2}
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            {t('pages.login.title')}
          </Title>

          <Form
            form={form}
            name='login'
            onFinish={handleLogin}
            autoComplete='off'
            layout='vertical'
          >
            <Form.Item
              name='email'
              label={t('pages.login.username')}
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
              label={t('pages.login.password')}
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
                {loginSubmit.loading ? '登录中...' : t('common.submit')}
              </Button>
            </Form.Item>
          </Form>

          <Space
            direction='vertical'
            style={{ width: '100%', marginTop: '16px' }}
          >
            <Text type='secondary' style={{ fontSize: '12px' }}>
              测试账号：admin@example.com / 123456
            </Text>
            <Text type='secondary' style={{ fontSize: '12px' }}>
              注意：由于没有真实后端，登录会失败，但你可以看到错误处理效果
            </Text>
          </Space>
        </Card>
      </div>
    </LayoutBlank>
  );
};

export default Login;
