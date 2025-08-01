/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\article\index.ts
 * @Description: 文章管理模块 API 请求方法
 */

import { get, post, put, del } from '@/api';
import type {
  Article,
  ArticleListParams,
  ArticleListResponse,
  CreateArticleRequest,
  UpdateArticleRequest,
  Category,
  Comment,
  CreateCommentRequest,
  ArticleStats,
} from './type';

/**
 * 获取文章列表
 * GET /articles
 * @param params 查询参数
 * @returns 文章列表
 */
export const getArticles = async (params?: ArticleListParams) => {
  return get<ArticleListResponse>('/articles', params);
};

/**
 * 获取单个文章信息
 * GET /articles/:id
 * @param id 文章ID
 * @returns 文章信息
 */
export const getArticle = async (id: string) => {
  return get<Article>(`/articles/${id}`);
};

/**
 * 创建文章
 * POST /articles
 * @param data 文章信息
 * @returns 创建的文章信息
 */
export const createArticle = async (data: CreateArticleRequest) => {
  return post<Article>('/articles', data);
};

/**
 * 更新文章信息
 * PUT /articles/:id
 * @param id 文章ID
 * @param data 更新的文章信息
 * @returns 更新后的文章信息
 */
export const updateArticle = async (id: string, data: UpdateArticleRequest) => {
  return put<Article>(`/articles/${id}`, data);
};

/**
 * 删除文章
 * DELETE /articles/:id
 * @param id 文章ID
 * @returns 删除响应
 */
export const deleteArticle = async (id: string) => {
  return del<void>(`/articles/${id}`);
};

/**
 * 批量删除文章
 * DELETE /articles/batch?ids=1,2,3
 * @param ids 文章ID数组
 * @returns 批量删除响应
 */
export const batchDeleteArticles = async (ids: string[]) => {
  const idsParam = ids.join(',');
  return del<void>(`/articles/batch?ids=${idsParam}`);
};

/**
 * 发布文章
 * PUT /articles/:id/publish
 * @param id 文章ID
 * @returns 发布响应
 */
export const publishArticle = async (id: string) => {
  return put<Article>(`/articles/${id}/publish`);
};

/**
 * 取消发布文章
 * PUT /articles/:id/unpublish
 * @param id 文章ID
 * @returns 取消发布响应
 */
export const unpublishArticle = async (id: string) => {
  return put<Article>(`/articles/${id}/unpublish`);
};

/**
 * 归档文章
 * PUT /articles/:id/archive
 * @param id 文章ID
 * @returns 归档响应
 */
export const archiveArticle = async (id: string) => {
  return put<Article>(`/articles/${id}/archive`);
};

/**
 * 获取文章统计信息
 * GET /articles/stats
 * @returns 文章统计信息
 */
export const getArticleStats = async () => {
  return get<ArticleStats>('/articles/stats');
};

/**
 * 获取文章分类列表
 * GET /articles/categories
 * @returns 分类列表
 */
export const getCategories = async () => {
  return get<Category[]>('/articles/categories');
};

/**
 * 创建文章分类
 * POST /articles/categories
 * @param data 分类信息
 * @returns 创建的分类信息
 */
export const createCategory = async (data: {
  name: string;
  description?: string;
  parentId?: string;
}) => {
  return post<Category>('/articles/categories', data);
};

/**
 * 更新文章分类
 * PUT /articles/categories/:id
 * @param id 分类ID
 * @param data 更新的分类信息
 * @returns 更新后的分类信息
 */
export const updateCategory = async (
  id: string,
  data: { name?: string; description?: string; parentId?: string }
) => {
  return put<Category>(`/articles/categories/${id}`, data);
};

/**
 * 删除文章分类
 * DELETE /articles/categories/:id
 * @param id 分类ID
 * @returns 删除响应
 */
export const deleteCategory = async (id: string) => {
  return del<void>(`/articles/categories/${id}`);
};

/**
 * 获取文章评论列表
 * GET /articles/:id/comments
 * @param articleId 文章ID
 * @returns 评论列表
 */
export const getArticleComments = async (articleId: string) => {
  return get<Comment[]>(`/articles/${articleId}/comments`);
};

/**
 * 创建文章评论
 * POST /articles/:id/comments
 * @param articleId 文章ID
 * @param data 评论信息
 * @returns 创建的评论信息
 */
export const createArticleComment = async (
  articleId: string,
  data: CreateCommentRequest
) => {
  return post<Comment>(`/articles/${articleId}/comments`, data);
};

/**
 * 删除文章评论
 * DELETE /articles/:articleId/comments/:commentId
 * @param articleId 文章ID
 * @param commentId 评论ID
 * @returns 删除响应
 */
export const deleteArticleComment = async (
  articleId: string,
  commentId: string
) => {
  return del<void>(`/articles/${articleId}/comments/${commentId}`);
};

/**
 * 点赞文章
 * POST /articles/:id/like
 * @param id 文章ID
 * @returns 点赞响应
 */
export const likeArticle = async (id: string) => {
  return post<void>(`/articles/${id}/like`);
};

/**
 * 取消点赞文章
 * DELETE /articles/:id/like
 * @param id 文章ID
 * @returns 取消点赞响应
 */
export const unlikeArticle = async (id: string) => {
  return del<void>(`/articles/${id}/like`);
};

/**
 * 增加文章浏览量
 * POST /articles/:id/view
 * @param id 文章ID
 * @returns 增加浏览量响应
 */
export const incrementArticleView = async (id: string) => {
  return post<void>(`/articles/${id}/view`);
};
