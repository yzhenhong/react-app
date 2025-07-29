/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 13:56:20
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 14:01:27
 * @FilePath: \react-app\craco.config.ts
 * @Description: 
 */

import path from 'path';

const cracoConfig = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};

export default cracoConfig;