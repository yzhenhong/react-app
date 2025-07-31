import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Card, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/login';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '@/store/slices/userSlice';
import { message } from 'antd';
import './index.less';

import LayoutBlank from '@/layout/blank/blank';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await login(values);

      if (response.success) {
        // 保存 token
        localStorage.setItem('token', response.data.token);

        // 更新 Redux 状态
        dispatch(
          loginAction({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            avatar: response.data.user.avatar || '',
            role: response.data.user.role,
          })
        );

        message.success('登录成功！');
        // 跳转到欢迎页面
        navigate('/welcome');
      } else {
        message.error(response.message || '登录失败，请检查邮箱和密码');
      }
    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
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
                loading={loading}
                size='large'
                block
              >
                {loading ? '登录中...' : t('common.submit')}
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
