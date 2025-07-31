import React from 'react';
import './index.less';

const Error: React.FC = () => {
  return (
    <div className='error-page'>
      <h1 className='error-title'>错误页面</h1>
      <div className='error-content'>
        <p>这是错误页面的内容</p>
        <ul className='error-list'>
          <li>错误标题 1</li>
          <li>错误标题 2</li>
          <li>错误标题 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Error;
