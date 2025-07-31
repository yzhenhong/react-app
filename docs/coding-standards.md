# 代码规范

本文档定义了项目的代码编写规范和最佳实践，确保代码质量和团队协作效率。

## 📋 文件命名规范

### 组件文件
- 使用 PascalCase：`UserProfile.tsx`
- 组件名称与文件名保持一致
- 示例：`Button.tsx`, `UserCard.tsx`, `NavigationBar.tsx`

### 工具文件
- 使用 camelCase：`formatDate.ts`
- 功能描述性命名
- 示例：`apiClient.ts`, `dateUtils.ts`, `validationHelper.ts`

### 常量文件
- 使用 UPPER_SNAKE_CASE：`API_ENDPOINTS.ts`
- 描述性命名
- 示例：`CONSTANTS.ts`, `ERROR_MESSAGES.ts`

### 样式文件
- 使用 kebab-case：`user-profile.less`
- 与组件文件对应
- 示例：`button.less`, `navigation-bar.less`

## 🧩 组件规范

### 函数组件

```typescript
import React from 'react';
import { Button } from 'antd';

interface UserProfileProps {
  name: string;
  email: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  onEdit,
  onDelete
}) => {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>{email}</p>
      <div className="user-profile__actions">
        {onEdit && <Button onClick={onEdit}>编辑</Button>}
        {onDelete && <Button danger onClick={onDelete}>删除</Button>}
      </div>
    </div>
  );
};

export default UserProfile;
```

## 📦 导入规范

### 导入顺序

```typescript
// 1. React 相关
import React, { useState, useEffect } from 'react';

// 2. 第三方库
import { Button, Input, Form } from 'antd';
import { useQuery } from '@tanstack/react-query';

// 3. 内部模块（使用路径别名）
import { formatDate } from '@/utils/date';
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/hooks/useAuth';

// 4. 样式文件
import './UserProfile.less';
```

### 导入规则

- 使用绝对路径导入（`@/` 别名）
- 按类型分组导入
- 每个分组之间空一行
- 避免使用相对路径（`../`）

## 🎨 样式规范

### CSS 类命名

```less
// 使用 BEM 命名规范
.user-profile {
  &__header {
    // 用户资料头部
  }

  &__content {
    // 用户资料内容
  }

  &__actions {
    // 用户资料操作按钮
  }

  &--editing {
    // 编辑状态
  }
}
```

### Less 变量

```less
// 在 variables.less 中定义全局变量
@primary-color: #1890ff;
@border-radius: 6px;
@font-size-base: 14px;

// 在组件中使用
.user-profile {
  color: @primary-color;
  border-radius: @border-radius;
  font-size: @font-size-base;
}
```

## 🔧 TypeScript 规范

### 接口定义

```typescript
// 使用 interface 定义对象类型
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// 使用 type 定义联合类型或复杂类型
type UserStatus = 'active' | 'inactive' | 'pending';
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};
```

## 🚀 性能优化

### 组件优化

```typescript
// 使用 React.memo 优化渲染
const UserCard = React.memo<UserCardProps>(({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <Button onClick={() => onEdit(user.id)}>编辑</Button>
    </div>
  );
});

// 使用 useCallback 优化回调函数
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleEdit = useCallback((userId: string) => {
    // 处理编辑逻辑
  }, []);

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} onEdit={handleEdit} />
      ))}
    </div>
  );
};
```

### 懒加载

```typescript
// 使用 React.lazy 进行代码分割
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <LazyComponent />
    </Suspense>
  );
};
```

## 📝 注释规范

### 组件注释

```typescript
/**
 * 用户资料组件
 *
 * @param name - 用户姓名
 * @param email - 用户邮箱
 * @param onEdit - 编辑回调函数
 * @param onDelete - 删除回调函数
 */
const UserProfile: React.FC<UserProfileProps> = ({ name, email, onEdit, onDelete }) => {
  // 组件实现
};
```

### 函数注释

```typescript
/**
 * 格式化日期
 *
 * @param date - 日期对象或日期字符串
 * @param format - 格式化模式，默认为 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD'): string => {
  // 实现逻辑
};
```

## 🐛 错误处理

### 组件错误边界

```typescript
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('组件错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>出现错误，请刷新页面重试。</h1>;
    }

    return this.props.children;
  }
}
```

### 异步错误处理

```typescript
const useAsyncOperation = <T,>(asyncFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失败');
    } finally {
      setLoading(false);
    }
  }, [asyncFn]);

  return { data, loading, error, execute };
};
```

## 📋 代码检查

### ESLint 规则

项目使用 ESLint 进行代码质量检查，主要规则包括：

- 禁止未使用的变量（以 `_` 开头的参数除外）
- 警告使用 `any` 类型
- 关闭函数返回类型强制声明
- 关闭模块边界类型强制声明
- 警告非空断言操作符
- React 17+ 不需要导入 React
- 关闭 PropTypes 检查（使用 TypeScript）
- 警告 console 语句
- 错误 debugger 语句
- 强制使用 const 声明
- 禁止使用 var
- 强制使用对象简写
- 强制使用模板字符串

### Prettier 格式化

项目使用 Prettier 进行代码格式化，主要规则包括：

- 使用分号结尾
- 使用单引号
- 行宽限制为 80 字符
- 缩进使用 2 个空格
- 使用空格而不是制表符
- 对象和数组使用尾随逗号
- JSX 标签的 `>` 放在新行
- 箭头函数参数避免不必要的括号
- 使用 LF 行尾符
- JSX 中使用单引号

## 🎯 最佳实践

### 1. 组件设计原则
- 单一职责：每个组件只负责一个功能
- 可复用性：设计可复用的组件
- 可测试性：组件应该易于测试
- 可维护性：代码结构清晰，易于维护

### 2. 状态管理
- 使用 React Hooks 管理本地状态
- 使用 Redux Toolkit 管理全局状态
- 避免过度使用全局状态

### 3. 性能考虑
- 合理使用 React.memo 和 useCallback
- 避免在渲染函数中创建对象或函数
- 使用 React.lazy 进行代码分割

### 4. 安全性
- 验证用户输入
- 使用 HTTPS
- 避免 XSS 攻击
- 保护敏感信息

## 📚 相关文档

- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [ESLint 规则说明](https://eslint.org/docs/rules/)
- [Prettier 配置选项](https://prettier.io/docs/en/options.html)
