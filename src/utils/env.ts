/*
 * @Author: yangzhenhong
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 16:46:14
 * @FilePath: \react-app\src\utils\env.ts
 * @Description: 环境变量配置
 */

/**
 * 环境变量配置接口
 */
export interface EnvConfig {
  // 环境标识
  NODE_ENV: string;
  REACT_APP_ENV: string;

  // API 配置
  REACT_APP_API_BASE_URL: string;

  // 应用配置
  REACT_APP_APP_NAME: string;
  REACT_APP_APP_VERSION: string;
  REACT_APP_APP_DESCRIPTION: string;

  // 其他配置
  REACT_APP_UPLOAD_URL: string;
  REACT_APP_CDN_URL: string;
}

/**
 * 获取环境变量配置
 */
export const getEnvConfig = (): EnvConfig => {
  return {
    // 环境标识
    NODE_ENV: process.env.NODE_ENV || '',
    REACT_APP_ENV: process.env.REACT_APP_ENV || '',

    // API 配置
    REACT_APP_API_BASE_URL:
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',

    // 应用配置
    REACT_APP_APP_NAME: process.env.REACT_APP_APP_NAME || 'React App',
    REACT_APP_APP_VERSION: process.env.REACT_APP_APP_VERSION || '0.1.0',
    REACT_APP_APP_DESCRIPTION:
      process.env.REACT_APP_APP_DESCRIPTION || 'React应用',

    // 其他配置
    REACT_APP_UPLOAD_URL:
      process.env.REACT_APP_UPLOAD_URL || 'http://localhost:3001/upload',
    REACT_APP_CDN_URL:
      process.env.REACT_APP_CDN_URL || 'http://localhost:3001/static',
  };
};

/**
 * 当前环境配置
 */
export const envConfig = getEnvConfig();

/**
 * 环境判断工具函数
 */
export const isDevelopment = () => envConfig.REACT_APP_ENV === 'development';
export const isTest = () => envConfig.REACT_APP_ENV === 'test';
export const isRelease = () => envConfig.REACT_APP_ENV === 'release';
export const isProduction = () => envConfig.REACT_APP_ENV === 'production';

export default envConfig;
