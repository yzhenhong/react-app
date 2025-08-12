/*
 * @Author: yangzhenhong
 * @Date: 2025-08-04 10:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-08-12 10:27:52
 * @FilePath: \react-app\src\mock\index.ts
 * @Description: Mock 数据主入口文件
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * 创建 MSW Worker 实例
 * 用于在浏览器环境中拦截网络请求
 */
export const worker = setupWorker(...handlers);

/**
 * 启动 Mock 服务
 * 只在开发环境且启用了 Mock 时启动
 */
export const startMock = async () => {
  console.log('🔍 开始检查 Mock 服务启动条件...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('REACT_APP_ENABLE_MOCK:', process.env.REACT_APP_ENABLE_MOCK);

  // 检查是否在开发环境且启用了 Mock
  const shouldEnableMock =
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_ENABLE_MOCK === 'true';

  console.log('shouldEnableMock:', shouldEnableMock);

  if (shouldEnableMock) {
    try {
      console.log('🚀 正在启动 MSW Worker...');
      // 启动 MSW Worker，使用更简单的配置
      await worker.start({
        onUnhandledRequest: 'bypass', // 未处理的请求直接通过
        quiet: false, // 显示详细日志
      });

      console.log('🎭 Mock 服务已启动');

      // 验证 handlers 是否正确加载
      console.log('📋 已加载的 handlers 数量:', handlers.length);
      handlers.forEach((handler, index) => {
        console.log(`  ${index + 1}. ${handler.info.header}`);
      });
    } catch (error) {
      console.error('❌ Mock 服务启动失败:', error);
    }
  } else {
    console.log('⚠️ Mock 服务未启动 - 条件不满足');
  }
};

/**
 * 停止 Mock 服务
 */
export const stopMock = () => {
  worker.stop();
  console.log('🎭 Mock 服务已停止');
};

/**
 * 检查 Mock 是否已启用
 */
export const isMockEnabled = () => {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_ENABLE_MOCK === 'true'
  );
};
