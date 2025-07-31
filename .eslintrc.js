/**
 * ESLint 配置文件
 *
 * ESLint 是一个静态代码分析工具，用于识别和修复 JavaScript/TypeScript 代码中的问题
 *
 * 主要功能：
 * - TypeScript 代码类型检查
 * - React 最佳实践检查
 * - 可访问性 (a11y) 检查
 * - 代码风格统一（与 Prettier 集成）
 * - 潜在错误检测
 */

module.exports = {
  // 运行环境配置
  env: {
    browser: true, // 浏览器环境
    es2021: true, // ES2021 特性
    node: true, // Node.js 环境
  },

  // 扩展配置 - 继承预设规则集
  extends: [
    'eslint:recommended', // ESLint 推荐规则
    'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
    'plugin:react/recommended', // React 推荐规则
    'plugin:react-hooks/recommended', // React Hooks 规则
    'plugin:jsx-a11y/recommended', // 可访问性规则
    'prettier', // Prettier 集成（必须放在最后）
  ],

  // 解析器配置
  parser: '@typescript-eslint/parser', // TypeScript 解析器
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // 支持 JSX
    },
    ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
    sourceType: 'module', // 使用 ES 模块
  },

  // 插件配置
  plugins: [
    'react', // React 插件
    '@typescript-eslint', // TypeScript 插件
    'prettier', // Prettier 插件
  ],

  // 规则配置
  rules: {
    // Prettier 集成规则
    'prettier/prettier': 'error', // 将 Prettier 错误作为 ESLint 错误

    // TypeScript 特定规则
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 未使用变量检查（忽略下划线开头的参数）
    '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 any 类型
    '@typescript-eslint/explicit-function-return-type': 'off', // 不强制要求函数返回类型
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 不强制要求模块边界类型
    '@typescript-eslint/no-non-null-assertion': 'warn', // 警告使用非空断言

    // React 特定规则
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React
    'react/prop-types': 'off', // 使用 TypeScript 时不需要 PropTypes
    'react/jsx-uses-react': 'off', // React 17+ 不需要检查 React 使用
    'react/jsx-uses-vars': 'error', // 检查 JSX 中使用的变量

    // 通用代码质量规则
    'no-console': 'off', // 允许使用 console
    'no-debugger': 'error', // 禁止使用 debugger
    'no-alert': 'warn', // 警告使用 alert
    'prefer-const': 'error', // 优先使用 const
    'no-var': 'error', // 禁止使用 var
    'object-shorthand': 'error', // 使用对象简写语法
    'prefer-template': 'error', // 优先使用模板字符串
  },

  // 全局设置
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
  },

  // 忽略的文件和目录
  ignorePatterns: [
    'node_modules/', // 依赖包
    'build/', // 构建输出
    'dist/', // 分发文件
    '*.config.js', // 配置文件
    '*.config.ts', // TypeScript 配置文件
  ],
};
