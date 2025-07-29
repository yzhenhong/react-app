/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 13:56:20
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 14:16:30
 * @FilePath: \react-app\craco.config.ts
 * @Description: CRACO 配置文件 - 用于自定义 Create React App 的构建配置
 */

import path from 'path';

const cracoConfig = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 添加 Jest 配置，使测试环境也能识别路径别名
  jest: {
    configure: {
      moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
};

export default cracoConfig;