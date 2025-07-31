import React from 'react';
import './index.less';

import LayoutBlank from '@/layout/blank/blank';

const header = <header className='login-header'></header>;
const footer = <footer className='login-footer'></footer>;

const Login: React.FC = () => {
  return (
    <LayoutBlank header={header} footer={footer}>
      <div className='login-page'>
        <h1 className='login-title'>登录页面</h1>
        <div className='login-content'>
          <p>这是登录页面的内容</p>
        </div>
      </div>
    </LayoutBlank>
  );
};

export default Login;
