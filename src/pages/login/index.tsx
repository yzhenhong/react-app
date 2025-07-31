import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.less';

import LayoutBlank from '@/layout/blank/blank';

const Login: React.FC = () => {
  const { t } = useTranslation();

  const header = (
    <header className='login-header'>{t('pages.login.title')}</header>
  );
  const footer = <footer className='login-footer'>{t('common.submit')}</footer>;

  return (
    <LayoutBlank header={header} footer={footer}>
      <div className='login-page'>
        <h1 className='login-title'>{t('pages.login.title')}</h1>
        <div className='login-content'>
          <p>{t('pages.login.username')}: admin</p>
          <p>{t('pages.login.password')}: 123456</p>
          <p>{t('pages.login.rememberMe')}</p>
          <p>{t('pages.login.forgotPassword')}</p>
          <p>
            {t('pages.login.noAccount')} {t('pages.login.signUp')}
          </p>
        </div>
      </div>
    </LayoutBlank>
  );
};

export default Login;
