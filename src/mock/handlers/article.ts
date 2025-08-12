/*
 * @Author: yangzhenhong
 * @Date: 2025-08-04 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-12 10:45:16
 * @FilePath: \react-app\src\mock\handlers\article.ts
 * @Description: 文章管理模块 Mock 处理器
 */

import { http, HttpResponse, delay } from 'msw';

// 定义文章相关类型
interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  viewCount: number;
  likeCount: number;
  commentCount: number;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

interface CreateArticleRequest {
  title: string;
  content: string;
  summary: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  status?: 'published' | 'draft';
}

interface UpdateArticleRequest {
  title?: string;
  content?: string;
  summary?: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  status?: 'published' | 'draft';
}

// Mock 文章数据
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'React 19 新特性详解',
    content:
      'React 19 带来了许多激动人心的新特性，包括并发渲染、自动批处理等...',
    summary: '详细介绍 React 19 的新特性和使用方法',
    author: {
      id: '1',
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
    },
    category: '技术',
    tags: ['React', '前端', 'JavaScript'],
    status: 'published',
    viewCount: 1250,
    likeCount: 89,
    commentCount: 23,
    coverImage: 'https://picsum.photos/800/400?random=1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    publishedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'TypeScript 高级类型技巧',
    content: 'TypeScript 提供了强大的类型系统，本文将介绍一些高级类型技巧...',
    summary: '深入探讨 TypeScript 高级类型的使用技巧',
    author: {
      id: '2',
      name: '李四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
    },
    category: '技术',
    tags: ['TypeScript', '前端', '类型系统'],
    status: 'published',
    viewCount: 890,
    likeCount: 67,
    commentCount: 15,
    coverImage: 'https://picsum.photos/800/400?random=2',
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    publishedAt: '2024-01-14T14:30:00Z',
  },
  {
    id: '3',
    title: '前端性能优化实践',
    content: '性能优化是前端开发中的重要课题，本文将从多个角度介绍优化方法...',
    summary: '全面的前端性能优化指南',
    author: {
      id: '1',
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
    },
    category: '技术',
    tags: ['性能优化', '前端', '最佳实践'],
    status: 'draft',
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    coverImage: 'https://picsum.photos/800/400?random=3',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    publishedAt: null,
  },
  {
    id: '4',
    title: 'Vue 3 Composition API 深度解析',
    content: 'Vue 3 的 Composition API 为组件逻辑复用提供了新的思路...',
    summary: '深入理解 Vue 3 Composition API 的设计理念和使用方法',
    author: {
      id: '3',
      name: '王五',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
    },
    category: '技术',
    tags: ['Vue', '前端', 'Composition API'],
    status: 'published',
    viewCount: 1560,
    likeCount: 120,
    commentCount: 34,
    coverImage: 'https://picsum.photos/800/400?random=4',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    publishedAt: '2024-01-12T16:45:00Z',
  },
  {
    id: '5',
    title: '现代 CSS 布局技术',
    content: 'CSS Grid 和 Flexbox 为现代网页布局提供了强大的工具...',
    summary: '介绍现代 CSS 布局技术的使用方法',
    author: {
      id: '4',
      name: '赵六',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu',
    },
    category: '技术',
    tags: ['CSS', '前端', '布局'],
    status: 'published',
    viewCount: 720,
    likeCount: 45,
    commentCount: 12,
    coverImage: 'https://picsum.photos/800/400?random=5',
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z',
    publishedAt: '2024-01-11T11:20:00Z',
  },
];

// Mock 分类数据
const mockCategories = [
  { id: '1', name: '技术', count: 15 },
  { id: '2', name: '生活', count: 8 },
  { id: '3', name: '随笔', count: 12 },
  { id: '4', name: '教程', count: 20 },
];

// Mock 标签数据
const mockTags = [
  { id: '1', name: 'React', count: 5 },
  { id: '2', name: 'Vue', count: 3 },
  { id: '3', name: 'TypeScript', count: 4 },
  { id: '4', name: 'JavaScript', count: 8 },
  { id: '5', name: 'CSS', count: 6 },
  { id: '6', name: '前端', count: 12 },
  { id: '7', name: '性能优化', count: 2 },
  { id: '8', name: '最佳实践', count: 3 },
];

/**
 * 文章管理模块 Mock 处理器
 */
export const articleHandlers = [
  /**
   * 获取文章列表
   * GET /articles
   */
  http.get('/api/articles', async ({ request }) => {
    await delay(400); // 模拟网络延迟

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';
    const status = url.searchParams.get('status') || '';
    const authorId = url.searchParams.get('authorId') || '';

    // 过滤文章数据
    let filteredArticles = [...mockArticles];

    // 搜索过滤
    if (search) {
      filteredArticles = filteredArticles.filter(
        article =>
          article.title.toLowerCase().includes(search.toLowerCase()) ||
          article.content.toLowerCase().includes(search.toLowerCase()) ||
          article.summary.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 分类过滤
    if (category) {
      filteredArticles = filteredArticles.filter(
        article => article.category === category
      );
    }

    // 状态过滤
    if (status) {
      filteredArticles = filteredArticles.filter(
        article => article.status === status
      );
    }

    // 作者过滤
    if (authorId) {
      filteredArticles = filteredArticles.filter(
        article => article.author.id === authorId
      );
    }

    // 分页处理
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    return HttpResponse.json({
      code: 200,
      message: '获取文章列表成功',
      data: {
        articles: paginatedArticles,
        pagination: {
          page,
          limit,
          total: filteredArticles.length,
          totalPages: Math.ceil(filteredArticles.length / limit),
        },
      },
      success: true,
    });
  }),

  /**
   * 获取单个文章详情
   * GET /articles/:id
   */
  http.get('/api/articles/:id', async ({ params }) => {
    await delay(300); // 模拟网络延迟

    const { id } = params;
    const article = mockArticles.find(a => a.id === id);

    if (!article) {
      return HttpResponse.json(
        {
          code: 404,
          message: '文章不存在',
          data: null,
          success: false,
        },
        { status: 404 }
      );
    }

    // 模拟增加浏览量
    article.viewCount += 1;

    return HttpResponse.json({
      code: 200,
      message: '获取文章详情成功',
      data: article,
      success: true,
    });
  }),

  /**
   * 创建文章
   * POST /articles
   */
  http.post('/api/articles', async ({ request }) => {
    await delay(600); // 模拟网络延迟

    const body = (await request.json()) as CreateArticleRequest;
    const { title, content, summary, category, tags, coverImage, status } =
      body;

    // 创建新文章
    const newArticle: Article = {
      id: String(mockArticles.length + 1),
      title,
      content,
      summary,
      author: {
        id: '1', // 模拟当前登录用户
        name: '张三',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
      },
      category,
      tags: tags || [],
      status: status || 'draft',
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      coverImage:
        coverImage || `https://picsum.photos/800/400?random=${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === 'published' ? new Date().toISOString() : null,
    };

    mockArticles.push(newArticle);

    return HttpResponse.json({
      code: 201,
      message: '创建文章成功',
      data: newArticle,
      success: true,
    });
  }),

  /**
   * 更新文章
   * PUT /articles/:id
   */
  http.put('/api/articles/:id', async ({ params, request }) => {
    await delay(400); // 模拟网络延迟

    const { id } = params;
    const body = (await request.json()) as UpdateArticleRequest;
    const { title, content, summary, category, tags, coverImage, status } =
      body;

    const articleIndex = mockArticles.findIndex(a => a.id === id);

    if (articleIndex === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: '文章不存在',
          data: null,
          success: false,
        },
        { status: 404 }
      );
    }

    // 更新文章信息
    const updatedArticle: Article = {
      ...mockArticles[articleIndex],
      title: title || mockArticles[articleIndex].title,
      content: content || mockArticles[articleIndex].content,
      summary: summary || mockArticles[articleIndex].summary,
      category: category || mockArticles[articleIndex].category,
      tags: tags || mockArticles[articleIndex].tags,
      coverImage: coverImage || mockArticles[articleIndex].coverImage,
      status: status || mockArticles[articleIndex].status,
      updatedAt: new Date().toISOString(),
      publishedAt:
        status === 'published' && !mockArticles[articleIndex].publishedAt
          ? new Date().toISOString()
          : mockArticles[articleIndex].publishedAt,
    };

    mockArticles[articleIndex] = updatedArticle;

    return HttpResponse.json({
      code: 200,
      message: '更新文章成功',
      data: updatedArticle,
      success: true,
    });
  }),

  /**
   * 删除文章
   * DELETE /articles/:id
   */
  http.delete('/api/articles/:id', async ({ params }) => {
    await delay(300); // 模拟网络延迟

    const { id } = params;
    const articleIndex = mockArticles.findIndex(a => a.id === id);

    if (articleIndex === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: '文章不存在',
          data: null,
          success: false,
        },
        { status: 404 }
      );
    }

    // 删除文章
    const deletedArticle = mockArticles.splice(articleIndex, 1)[0];

    return HttpResponse.json({
      code: 200,
      message: '删除文章成功',
      data: deletedArticle,
      success: true,
    });
  }),

  /**
   * 批量删除文章
   * DELETE /articles/batch
   */
  http.delete('/articles/batch', async ({ request }) => {
    await delay(500); // 模拟网络延迟

    const body = (await request.json()) as { ids: string[] };
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return HttpResponse.json(
        {
          code: 400,
          message: '请选择要删除的文章',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    const deletedArticles: Article[] = [];
    const failedIds: string[] = [];

    ids.forEach(id => {
      const articleIndex = mockArticles.findIndex(a => a.id === id);

      if (articleIndex === -1) {
        failedIds.push(id);
      } else {
        const deletedArticle = mockArticles.splice(articleIndex, 1)[0];
        deletedArticles.push(deletedArticle);
      }
    });

    return HttpResponse.json({
      code: 200,
      message: '批量删除完成',
      data: {
        deletedArticles,
        failedIds,
        successCount: deletedArticles.length,
        failedCount: failedIds.length,
      },
      success: true,
    });
  }),

  /**
   * 获取文章分类
   * GET /articles/categories
   */
  http.get('/api/articles/categories', async () => {
    await delay(200); // 模拟网络延迟

    return HttpResponse.json({
      code: 200,
      message: '获取分类列表成功',
      data: mockCategories,
      success: true,
    });
  }),

  /**
   * 获取文章标签
   * GET /articles/tags
   */
  http.get('/api/articles/tags', async () => {
    await delay(200); // 模拟网络延迟

    return HttpResponse.json({
      code: 200,
      message: '获取标签列表成功',
      data: mockTags,
      success: true,
    });
  }),

  /**
   * 点赞文章
   * POST /articles/:id/like
   */
  http.post('/api/articles/:id/like', async ({ params }) => {
    await delay(200); // 模拟网络延迟

    const { id } = params;
    const article = mockArticles.find(a => a.id === id);

    if (!article) {
      return HttpResponse.json(
        {
          code: 404,
          message: '文章不存在',
          data: null,
          success: false,
        },
        { status: 404 }
      );
    }

    // 增加点赞数
    article.likeCount += 1;

    return HttpResponse.json({
      code: 200,
      message: '点赞成功',
      data: { likeCount: article.likeCount },
      success: true,
    });
  }),

  /**
   * 取消点赞文章
   * DELETE /articles/:id/like
   */
  http.delete('/api/articles/:id/like', async ({ params }) => {
    await delay(200); // 模拟网络延迟

    const { id } = params;
    const article = mockArticles.find(a => a.id === id);

    if (!article) {
      return HttpResponse.json(
        {
          code: 404,
          message: '文章不存在',
          data: null,
          success: false,
        },
        { status: 404 }
      );
    }

    // 减少点赞数
    article.likeCount = Math.max(0, article.likeCount - 1);

    return HttpResponse.json({
      code: 200,
      message: '取消点赞成功',
      data: { likeCount: article.likeCount },
      success: true,
    });
  }),

  /**
   * 获取文章统计信息
   * GET /articles/stats
   */
  http.get('/api/articles/stats', async () => {
    await delay(200); // 模拟网络延迟

    const totalArticles = mockArticles.length;
    const publishedArticles = mockArticles.filter(
      a => a.status === 'published'
    ).length;
    const draftArticles = mockArticles.filter(a => a.status === 'draft').length;

    const totalViews = mockArticles.reduce(
      (sum, article) => sum + article.viewCount,
      0
    );
    const totalLikes = mockArticles.reduce(
      (sum, article) => sum + article.likeCount,
      0
    );
    const totalComments = mockArticles.reduce(
      (sum, article) => sum + article.commentCount,
      0
    );

    const categoryStats = mockArticles.reduce(
      (acc, article) => {
        acc[article.category] = (acc[article.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return HttpResponse.json({
      code: 200,
      message: '获取文章统计信息成功',
      data: {
        total: totalArticles,
        published: publishedArticles,
        draft: draftArticles,
        totalViews,
        totalLikes,
        totalComments,
        categoryStats,
      },
      success: true,
    });
  }),

  /**
   * 发布文章
   * POST /articles/:id/publish
   */
  http.post('/api/articles/:id/publish', async ({ params }) => {
    await delay(300); // 模拟网络延迟

    const { id } = params;
    const article = mockArticles.find(a => a.id === id);

    if (!article) {
      return HttpResponse.json(
        {
          code: 404,
          message: '文章不存在',
          data: null,
          success: false,
        },
        { status: 404 }
      );
    }

    if (article.status === 'published') {
      return HttpResponse.json(
        {
          code: 400,
          message: '文章已经是发布状态',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    // 发布文章
    article.status = 'published';
    article.publishedAt = new Date().toISOString();
    article.updatedAt = new Date().toISOString();

    return HttpResponse.json({
      code: 200,
      message: '文章发布成功',
      data: article,
      success: true,
    });
  }),

  /**
   * 撤回文章
   * POST /articles/:id/unpublish
   */
  http.post('/articles/:id/unpublish', async ({ params }) => {
    await delay(300); // 模拟网络延迟

    const { id } = params;
    const article = mockArticles.find(a => a.id === id);

    if (!article) {
      return HttpResponse.json(
        {
          code: 404,
          message: '文章不存在',
          data: null,
          success: false,
        },
        { status: 404 }
      );
    }

    if (article.status === 'draft') {
      return HttpResponse.json(
        {
          code: 400,
          message: '文章已经是草稿状态',
          data: null,
          success: false,
        },
        { status: 400 }
      );
    }

    // 撤回文章
    article.status = 'draft';
    article.updatedAt = new Date().toISOString();

    return HttpResponse.json({
      code: 200,
      message: '文章撤回成功',
      data: article,
      success: true,
    });
  }),
];
