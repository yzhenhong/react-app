/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 11:49:57
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 15:28:27
 * @FilePath: \react-app\src\App.tsx
 * @Description:
 */

import TestLess from '@/components/TestLess';

function App() {
  return (
    <div className='App'>
      <h1>Hello World</h1>
      <TestLess />
      <div
        style={{
          backgroundColor: 'green',
          padding: '20px',
          margin: '20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h2>内联样式测试（绿色背景）</h2>
        <p>如果你看到这个绿色背景，说明 React 正常工作</p>
      </div>
    </div>
  );
}

export default App;
