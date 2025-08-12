/*
 * @Author: yangzhenhong
 * @Date: 2025-08-04 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-04 10:00:00
 * @FilePath: \react-app\src\components\MockDemo\index.tsx
 * @Description: Mock 数据演示组件
 */

import React, { useState } from 'react';
import {
  Card,
  Button,
  Table,
  Space,
  message,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Avatar,
  Statistic,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  LikeOutlined,
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { login, getCurrentUser } from '@/api/login';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
} from '@/api/user';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleStats,
} from '@/api/article';
import type { LoginRequest } from '@/api/login/type';
import type { User } from '@/api/user/type';
import type { CreateUserRequest, UpdateUserRequest } from '@/api/user/type';
import type {
  CreateArticleRequest,
  UpdateArticleRequest,
} from '@/api/article/type';
import { isMockEnabled } from '@/mock';
import './index.less';

const { Option } = Select;
const { TextArea } = Input;

/**
 * Mock 数据演示组件
 * 展示如何使用 Mock 数据进行开发和测试
 */
const MockDemo: React.FC = () => {
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<any>(null);
  const [articleStats, setArticleStats] = useState<any>(null);

  // 模态框状态
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [articleModalVisible, setArticleModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // 表单实例
  const [userForm] = Form.useForm();
  const [articleForm] = Form.useForm();

  // 检查 Mock 是否启用
  const mockEnabled = isMockEnabled();

  /**
   * 用户登录
   */
  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const loginData: LoginRequest = {
        email: 'zhangsan@example.com',
        password: '123456',
      };

      const response = await login(loginData);
      if (response.success) {
        message.success('登录成功！');
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
      } else {
        message.error(response.message || '登录失败');
      }
    } catch (error) {
      message.error('登录失败，请检查网络连接');
    } finally {
      setLoginLoading(false);
    }
  };

  /**
   * 获取当前用户信息
   */
  const handleGetCurrentUser = async () => {
    setLoading(true);
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setUser(response.data);
        message.success('获取用户信息成功！');
      } else {
        message.error(response.message || '获取用户信息失败');
      }
    } catch (error) {
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取用户列表
   */
  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers({ page: 1, limit: 10 });
      if (response.success) {
        setUsers(response.data.users);
        message.success('获取用户列表成功！');
      } else {
        message.error(response.message || '获取用户列表失败');
      }
    } catch (error) {
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取用户统计信息
   */
  const handleGetUserStats = async () => {
    setLoading(true);
    try {
      const response = await getUserStats();
      if (response.success) {
        setUserStats(response.data);
        message.success('获取用户统计信息成功！');
      } else {
        message.error(response.message || '获取用户统计信息失败');
      }
    } catch (error) {
      message.error('获取用户统计信息失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取文章列表
   */
  const handleGetArticles = async () => {
    setLoading(true);
    try {
      const response = await getArticles({ page: 1, limit: 10 });
      if (response.success) {
        setArticles(response.data.articles);
        message.success('获取文章列表成功！');
      } else {
        message.error(response.message || '获取文章列表失败');
      }
    } catch (error) {
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取文章统计信息
   */
  const handleGetArticleStats = async () => {
    setLoading(true);
    try {
      const response = await getArticleStats();
      if (response.success) {
        setArticleStats(response.data);
        message.success('获取文章统计信息成功！');
      } else {
        message.error(response.message || '获取文章统计信息失败');
      }
    } catch (error) {
      message.error('获取文章统计信息失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 创建用户
   */
  const handleCreateUser = async (values: CreateUserRequest) => {
    try {
      const response = await createUser(values);
      if (response.success) {
        message.success('创建用户成功！');
        setUserModalVisible(false);
        userForm.resetFields();
        handleGetUsers(); // 刷新用户列表
      } else {
        message.error(response.message || '创建用户失败');
      }
    } catch (error) {
      message.error('创建用户失败');
    }
  };

  /**
   * 更新用户
   */
  const handleUpdateUser = async (values: UpdateUserRequest) => {
    if (!editingUser) return;

    try {
      const response = await updateUser(editingUser.id, values);
      if (response.success) {
        message.success('更新用户成功！');
        setUserModalVisible(false);
        setEditingUser(null);
        userForm.resetFields();
        handleGetUsers(); // 刷新用户列表
      } else {
        message.error(response.message || '更新用户失败');
      }
    } catch (error) {
      message.error('更新用户失败');
    }
  };

  /**
   * 删除用户
   */
  const handleDeleteUser = async (userId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      onOk: async () => {
        try {
          const response = await deleteUser(userId);
          if (response.success) {
            message.success('删除用户成功！');
            handleGetUsers(); // 刷新用户列表
          } else {
            message.error(response.message || '删除用户失败');
          }
        } catch (error) {
          message.error('删除用户失败');
        }
      },
    });
  };

  /**
   * 创建文章
   */
  const handleCreateArticle = async (values: CreateArticleRequest) => {
    try {
      const response = await createArticle(values);
      if (response.success) {
        message.success('创建文章成功！');
        setArticleModalVisible(false);
        articleForm.resetFields();
        handleGetArticles(); // 刷新文章列表
      } else {
        message.error(response.message || '创建文章失败');
      }
    } catch (error) {
      message.error('创建文章失败');
    }
  };

  /**
   * 更新文章
   */
  const handleUpdateArticle = async (values: UpdateArticleRequest) => {
    if (!editingArticle) return;

    try {
      const response = await updateArticle(editingArticle.id, values);
      if (response.success) {
        message.success('更新文章成功！');
        setArticleModalVisible(false);
        setEditingArticle(null);
        articleForm.resetFields();
        handleGetArticles(); // 刷新文章列表
      } else {
        message.error(response.message || '更新文章失败');
      }
    } catch (error) {
      message.error('更新文章失败');
    }
  };

  /**
   * 删除文章
   */
  const handleDeleteArticle = async (articleId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这篇文章吗？',
      onOk: async () => {
        try {
          const response = await deleteArticle(articleId);
          if (response.success) {
            message.success('删除文章成功！');
            handleGetArticles(); // 刷新文章列表
          } else {
            message.error(response.message || '删除文章失败');
          }
        } catch (error) {
          message.error('删除文章失败');
        }
      },
    });
  };

  /**
   * 打开用户编辑模态框
   */
  const openUserModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      userForm.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      userForm.resetFields();
    }
    setUserModalVisible(true);
  };

  /**
   * 打开文章编辑模态框
   */
  const openArticleModal = (article?: any) => {
    if (article) {
      setEditingArticle(article);
      articleForm.setFieldsValue({
        title: article.title,
        content: article.content,
        summary: article.summary,
        category: article.category,
        tags: article.tags,
        status: article.status,
      });
    } else {
      setEditingArticle(null);
      articleForm.resetFields();
    }
    setArticleModalVisible(true);
  };

  // 用户表格列配置
  const userColumns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => (
        <Avatar src={avatar} icon={<UserOutlined />} />
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const color =
          role === 'admin' ? 'red' : role === 'moderator' ? 'orange' : 'blue';
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '活跃' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size='middle'>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => openUserModal(record)}
          >
            编辑
          </Button>
          <Button
            type='link'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 文章表格列配置
  const articleColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: ['author', 'name'],
      key: 'author',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status === 'published' ? '已发布' : '草稿'}
        </Tag>
      ),
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      render: (count: number) => (
        <Space>
          <EyeOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: '点赞数',
      dataIndex: 'likeCount',
      key: 'likeCount',
      render: (count: number) => (
        <Space>
          <LikeOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => openArticleModal(record)}
          >
            编辑
          </Button>
          <Button
            type='link'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteArticle(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='mock-demo'>
      <Card title='🎭 Mock 数据演示' className='demo-card'>
        <div className='mock-status'>
          <Tag color={mockEnabled ? 'green' : 'red'}>
            Mock 服务状态: {mockEnabled ? '已启用' : '未启用'}
          </Tag>
          {mockEnabled && (
            <p className='mock-tip'>
              💡 提示：当前使用 Mock 数据，所有 API 请求都会被拦截并返回模拟数据
            </p>
          )}
        </div>

        {/* 登录测试 */}
        <Card title='🔐 登录测试' size='small' className='section-card'>
          <Space>
            <Button type='primary' loading={loginLoading} onClick={handleLogin}>
              模拟登录 (zhangsan@example.com / 123456)
            </Button>
            <Button loading={loading} onClick={handleGetCurrentUser}>
              获取当前用户信息
            </Button>
          </Space>
          {user && (
            <div className='user-info'>
              <Avatar src={user.avatar} size={64} />
              <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <Tag color={user.role === 'admin' ? 'red' : 'blue'}>
                  {user.role}
                </Tag>
              </div>
            </div>
          )}
        </Card>

        {/* 用户管理测试 */}
        <Card title='👥 用户管理测试' size='small' className='section-card'>
          <Space className='action-buttons'>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => openUserModal()}
            >
              创建用户
            </Button>
            <Button loading={loading} onClick={handleGetUsers}>
              获取用户列表
            </Button>
            <Button loading={loading} onClick={handleGetUserStats}>
              获取用户统计
            </Button>
          </Space>

          {userStats && (
            <Row gutter={16} className='stats-row'>
              <Col span={6}>
                <Statistic title='总用户数' value={userStats.total} />
              </Col>
              <Col span={6}>
                <Statistic title='活跃用户' value={userStats.active} />
              </Col>
              <Col span={6}>
                <Statistic title='禁用用户' value={userStats.inactive} />
              </Col>
              <Col span={6}>
                <Statistic
                  title='管理员'
                  value={userStats.roleStats?.admin || 0}
                />
              </Col>
            </Row>
          )}

          {users.length > 0 && (
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey='id'
              pagination={false}
              size='small'
            />
          )}
        </Card>

        {/* 文章管理测试 */}
        <Card title='📝 文章管理测试' size='small' className='section-card'>
          <Space className='action-buttons'>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => openArticleModal()}
            >
              创建文章
            </Button>
            <Button loading={loading} onClick={handleGetArticles}>
              获取文章列表
            </Button>
            <Button loading={loading} onClick={handleGetArticleStats}>
              获取文章统计
            </Button>
          </Space>

          {articleStats && (
            <Row gutter={16} className='stats-row'>
              <Col span={6}>
                <Statistic title='总文章数' value={articleStats.total} />
              </Col>
              <Col span={6}>
                <Statistic title='已发布' value={articleStats.published} />
              </Col>
              <Col span={6}>
                <Statistic title='草稿' value={articleStats.draft} />
              </Col>
              <Col span={6}>
                <Statistic title='总浏览量' value={articleStats.totalViews} />
              </Col>
            </Row>
          )}

          {articles.length > 0 && (
            <Table
              columns={articleColumns}
              dataSource={articles}
              rowKey='id'
              pagination={false}
              size='small'
            />
          )}
        </Card>
      </Card>

      {/* 用户编辑模态框 */}
      <Modal
        title={editingUser ? '编辑用户' : '创建用户'}
        open={userModalVisible}
        onCancel={() => {
          setUserModalVisible(false);
          setEditingUser(null);
          userForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={userForm}
          layout='vertical'
          onFinish={editingUser ? handleUpdateUser : handleCreateUser}
        >
          <Form.Item
            name='name'
            label='姓名'
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            name='email'
            label='邮箱'
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder='请输入邮箱' />
          </Form.Item>
          <Form.Item
            name='role'
            label='角色'
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder='请选择角色'>
              <Option value='user'>普通用户</Option>
              <Option value='moderator'>版主</Option>
              <Option value='admin'>管理员</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='status'
            label='状态'
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder='请选择状态'>
              <Option value='active'>活跃</Option>
              <Option value='inactive'>禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>
                {editingUser ? '更新' : '创建'}
              </Button>
              <Button
                onClick={() => {
                  setUserModalVisible(false);
                  setEditingUser(null);
                  userForm.resetFields();
                }}
              >
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 文章编辑模态框 */}
      <Modal
        title={editingArticle ? '编辑文章' : '创建文章'}
        open={articleModalVisible}
        onCancel={() => {
          setArticleModalVisible(false);
          setEditingArticle(null);
          articleForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={articleForm}
          layout='vertical'
          onFinish={editingArticle ? handleUpdateArticle : handleCreateArticle}
        >
          <Form.Item
            name='title'
            label='标题'
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder='请输入文章标题' />
          </Form.Item>
          <Form.Item
            name='summary'
            label='摘要'
            rules={[{ required: true, message: '请输入摘要' }]}
          >
            <TextArea rows={3} placeholder='请输入文章摘要' />
          </Form.Item>
          <Form.Item
            name='content'
            label='内容'
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <TextArea rows={6} placeholder='请输入文章内容' />
          </Form.Item>
          <Form.Item
            name='category'
            label='分类'
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder='请选择分类'>
              <Option value='技术'>技术</Option>
              <Option value='生活'>生活</Option>
              <Option value='随笔'>随笔</Option>
              <Option value='教程'>教程</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='status'
            label='状态'
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder='请选择状态'>
              <Option value='draft'>草稿</Option>
              <Option value='published'>发布</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>
                {editingArticle ? '更新' : '创建'}
              </Button>
              <Button
                onClick={() => {
                  setArticleModalVisible(false);
                  setEditingArticle(null);
                  articleForm.resetFields();
                }}
              >
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MockDemo;
