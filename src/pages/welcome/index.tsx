import React from 'react';
import Counter from '@/components/Counter';
import './index.less';

const Welcome: React.FC = () => {
  return (
    <div className='welcome-page'>
      <h1>欢迎页面</h1>
      <p>这是欢迎页面的内容</p>
      <Counter />
    </div>
  );
};

export default Welcome;
