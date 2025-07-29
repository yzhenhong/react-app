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
};

export default cracoConfig;
