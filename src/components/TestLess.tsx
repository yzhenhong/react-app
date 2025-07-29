import React from 'react';
import './TestLess.less';

const TestLess: React.FC = () => {
  return (
    <div className='test-less-container'>
      <h1 className='test-title'>Less 样式测试</h1>
      <p className='test-text'>
        如果你能看到这个文本有特殊样式，说明 Less 配置成功！
      </p>
      <button className='test-button'>测试按钮</button>
    </div>
  );
};

export default TestLess;
