/*
 * @Author: yangzhenhong
 * @Date: 2025-08-04 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-04 10:00:00
 * @FilePath: \react-app\src\pages\mock-demo\index.tsx
 * @Description: Mock 演示页面
 */

import React from 'react';
import MockDemo from '@/components/MockDemo';
import './index.less';

/**
 * Mock 演示页面
 * 展示如何使用 Mock 数据进行开发和测试
 */
const MockDemoPage: React.FC = () => {
  return (
    <div className='mock-demo-page'>
      <MockDemo />
    </div>
  );
};

export default MockDemoPage;
