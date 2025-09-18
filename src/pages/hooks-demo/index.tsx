/*
 * @Author: yangzhenhong
 * @Date: 2025-09-18 13:00:00
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-09-18 13:00:00
 * @FilePath: \react-app\src\pages\hooks-demo\index.tsx
 * @Description: React Hooks 演示页面
 */
import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
  forwardRef,
  createContext,
} from 'react';
import { Button, Card, Input, Space, message } from 'antd';
import type { InputRef } from 'antd';
import './index.less';

// 创建上下文
const ThemeContext = createContext({
  theme: 'light' as 'light' | 'dark',
  toggleTheme: () => {
    // 默认空实现，由Provider提供实际实现
  },
});

// useReducer 的 reducer 函数
interface CounterState {
  count: number;
  history: number[];
}

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1],
      };
    case 'RESET':
      return {
        count: 0,
        history: [...state.history, 0],
      };
    case 'SET':
      return {
        count: action.payload,
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }
};

// 自定义Hook - 使用计数器逻辑
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  useDebugValue(`Count: ${count}`);

  return { count, increment, decrement, reset };
};

// 自定义Hook - 使用本地存储
const useLocalStorage = function <T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};

// 子组件 - 使用 useImperativeHandle
interface ChildComponentRef {
  focusInput: () => void;
  getValue: () => string;
}

const ChildComponent = forwardRef<ChildComponentRef>((props, ref) => {
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
    },
    getValue: () => value,
  }));

  return (
    <div>
      <Input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='输入一些文本...'
      />
      <p>当前值: {value}</p>
    </div>
  );
});

ChildComponent.displayName = 'ChildComponent';

const HooksDemo: React.FC = () => {
  // useState 示例
  const [text, setText] = useState('');
  const [number, setNumber] = useState(0);

  // useRef 示例
  const inputRef = useRef<InputRef>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const childRef = useRef<ChildComponentRef>(null);

  // useContext 示例
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const themeContextValue = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme(prev => (prev === 'light' ? 'dark' : 'light')),
    }),
    [theme]
  );

  // useReducer 示例
  const [counterState, dispatch] = useReducer(counterReducer, {
    count: 0,
    history: [],
  });

  // 自定义Hook示例
  const { count: customCount, increment, decrement, reset } = useCounter(10);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    'hooks-demo-value',
    'Hello World'
  );

  // useMemo 示例
  const expensiveCalculation = useMemo(() => {
    console.log('执行昂贵的计算...');
    return number * 2 + 100;
  }, [number]);

  // useCallback 示例
  const handleExpensiveOperation = useCallback(() => {
    console.log('执行昂贵操作...');
    message.success('操作执行完成！');
  }, []);

  // useEffect 示例
  useEffect(() => {
    console.log('组件挂载或 text 变化:', text);
    return () => {
      console.log('清理函数执行');
    };
  }, [text]);

  // 定时器 useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('定时器执行...');
    }, 5000);

    intervalRef.current = interval;

    return () => {
      clearInterval(interval);
      console.log('清理定时器');
    };
  }, []);

  // useLayoutEffect 示例
  useLayoutEffect(() => {
    console.log('useLayoutEffect 执行 - DOM 更新前');
  }, [number]);

  // 调试 useDebugValue
  useDebugValue(`当前文本: ${text}, 数字: ${number}`);

  const handleChildOperations = () => {
    childRef.current?.focusInput();
    const childValue = childRef.current?.getValue();
    message.info(`子组件的值: ${childValue}`);
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className='hooks-demo'>
        <h1>React Hooks 演示</h1>

        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          {/* useState 示例 */}
          <Card title='useState - 基础状态管理' bordered={false}>
            <Space>
              <Input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder='输入文本...'
                style={{ width: 200 }}
              />
              <Button onClick={() => setText('')}>清除</Button>
              <span>当前值: {text}</span>
            </Space>
          </Card>

          {/* useRef 示例 */}
          <Card title='useRef - 引用管理' bordered={false}>
            <Space>
              <Input
                ref={inputRef}
                placeholder='点击按钮聚焦...'
                style={{ width: 200 }}
              />
              <Button onClick={() => inputRef.current?.focus()}>
                聚焦输入框
              </Button>
              <Button
                onClick={() => {
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    message.success('定时器已停止');
                  }
                }}
              >
                停止定时器
              </Button>
            </Space>
          </Card>

          {/* useContext 示例 */}
          <Card title='useContext - 上下文共享' bordered={false}>
            <Space>
              <span>当前主题: {theme}</span>
              <Button onClick={themeContextValue.toggleTheme}>
                切换到{theme === 'light' ? '暗色' : '亮色'}主题
              </Button>
            </Space>
          </Card>

          {/* useReducer 示例 */}
          <Card title='useReducer - 复杂状态管理' bordered={false}>
            <Space direction='vertical'>
              <Space>
                <span>计数器: {counterState.count}</span>
                <Button onClick={() => dispatch({ type: 'INCREMENT' })}>
                  +1
                </Button>
                <Button onClick={() => dispatch({ type: 'DECREMENT' })}>
                  -1
                </Button>
                <Button onClick={() => dispatch({ type: 'RESET' })}>
                  重置
                </Button>
                <Button onClick={() => dispatch({ type: 'SET', payload: 100 })}>
                  设置为100
                </Button>
              </Space>
              <div>
                <span>历史记录: </span>
                {counterState.history.slice(-5).join(' → ')}
              </div>
            </Space>
          </Card>

          {/* useMemo 示例 */}
          <Card title='useMemo - 值优化' bordered={false}>
            <Space>
              <span>数字: {number}</span>
              <Button onClick={() => setNumber(n => n + 1)}>+1</Button>
              <Button onClick={() => setNumber(n => n - 1)}>-1</Button>
              <div>昂贵计算结果: {expensiveCalculation}</div>
            </Space>
          </Card>

          {/* useCallback 示例 */}
          <Card title='useCallback - 回调优化' bordered={false}>
            <Space>
              <Button onClick={handleExpensiveOperation}>执行昂贵操作</Button>
              <span>回调函数已优化，避免不必要的重新渲染</span>
            </Space>
          </Card>

          {/* useImperativeHandle 示例 */}
          <Card title='useImperativeHandle - 自定义暴露方法' bordered={false}>
            <Space direction='vertical'>
              <ChildComponent ref={childRef} />
              <Space>
                <Button onClick={handleChildOperations}>操作子组件</Button>
                <span>父组件可以控制子组件的方法和状态</span>
              </Space>
            </Space>
          </Card>

          {/* 自定义Hook示例 */}
          <Card title='自定义Hook - useCounter' bordered={false}>
            <Space>
              <span>自定义计数器: {customCount}</span>
              <Button onClick={increment}>+1</Button>
              <Button onClick={decrement}>-1</Button>
              <Button onClick={reset}>重置</Button>
            </Space>
          </Card>

          {/* useLocalStorage 示例 */}
          <Card title='自定义Hook - useLocalStorage' bordered={false}>
            <Space>
              <Input
                value={localStorageValue}
                onChange={e => setLocalStorageValue(e.target.value)}
                placeholder='输入存储的值...'
                style={{ width: 200 }}
              />
              <Button onClick={() => setLocalStorageValue('默认值')}>
                重置
              </Button>
              <span>值会自动保存到本地存储</span>
            </Space>
          </Card>

          {/* useEffect 演示 */}
          <Card title='useEffect - 副作用演示' bordered={false}>
            <div>
              <p>查看控制台输出来了解 useEffect 的执行时机</p>
              <p>当前文本: {text}</p>
              <p>文本变化时会触发 useEffect</p>
            </div>
          </Card>

          {/* useLayoutEffect 演示 */}
          <Card title='useLayoutEffect - 布局副作用' bordered={false}>
            <div>
              <p>
                查看控制台来了解 useLayoutEffect 和 useEffect 的执行顺序差异
              </p>
              <p>数字变化时会触发 useLayoutEffect</p>
            </div>
          </Card>
        </Space>
      </div>
    </ThemeContext.Provider>
  );
};

export default HooksDemo;
