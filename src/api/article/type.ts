/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-01-27 10:00:00
 * @FilePath: \react-app\src\api\article\type.ts
 * @Description: 文章管理模块类型定义
 */

/**
 * 文章信息接口
 */
export interface Article {
  id: string;
  title: string;
  content: string;
  summary?: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: {
    id: string;
    name: string;
  };
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  coverImage?: string;
}

/**
 * 文章列表查询参数
 */
export interface ArticleListParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  authorId?: string;
  status?: 'draft' | 'published' | 'archived';
  sortBy?: 'title' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
}

/**
 * 文章列表响应数据
 */
export interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * 创建文章请求参数
 */
export interface CreateArticleRequest {
  title: string;
  content: string;
  summary?: string;
  categoryId: string;
  tags?: string[];
  status?: 'draft' | 'published';
  coverImage?: string;
}

/**
 * 更新文章请求参数
 */
export interface UpdateArticleRequest {
  title?: string;
  content?: string;
  summary?: string;
  categoryId?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
  coverImage?: string;
}

/**
 * 文章分类接口
 */
export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 文章评论接口
 */
export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  articleId: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
}

/**
 * 创建评论请求参数
 */
export interface CreateCommentRequest {
  content: string;
  articleId: string;
  parentId?: string;
}

/**
 * 文章统计信息
 */
export interface ArticleStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
}
