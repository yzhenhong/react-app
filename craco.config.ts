/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 13:56:20
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-12 11:25:57
 * @FilePath: \react-app\craco.config.ts
 * @Description:
 */

/**
 * CRACO 配置文件
 *
 * CRACO (Create React App Configuration Override) 用于自定义 Create React App 的配置
 * 无需 eject 即可修改 webpack、Babel 和 ESLint 配置
 *
 * 主要功能：
 * - 配置路径别名 (@/ 指向 src/)
 * - 集成 Less 预处理器
 * - 配置 ESLint
 * - 配置开发服务器代理
 */

import path from 'path';
// @ts-ignore - craco-less 没有 TypeScript 声明文件
import CracoLessPlugin from 'craco-less';

const cracoConfig = {
  // Webpack 配置
  webpack: {
    // 路径别名配置 - 简化导入路径
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    // 开发服务器配置
    configure: (webpackConfig: any, { env }: any) => {
      // 只在开发环境配置代理
      if (env === 'development') {
        // 配置开发服务器代理
        webpackConfig.devServer = {
          ...webpackConfig.devServer,
          proxy: {
            '/api': {
              target: process.env.REACT_APP_API_BASE_URL,
              changeOrigin: true,
              pathRewrite: {
                '^/api': '/api',
              },
            },
          },
        };
      }
      return webpackConfig;
    },
  },

  // ESLint 配置 - 集成到构建流程中
  eslint: {
    enable: true, // 启用 ESLint
    mode: 'extends', // 扩展现有配置
  },

  // 插件配置
  plugins: [
    // Less 预处理器插件
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true, // 启用 Less 中的 JavaScript 表达式
          },
        },
      },
    },
  ],

  // Babel 配置
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  },
};

export default cracoConfig;
