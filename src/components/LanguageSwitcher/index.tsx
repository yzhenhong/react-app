/*
 * @Author: yangzhenhong
 * @Date: 2025-07-31 09:45:43
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-31 11:09:09
 * @FilePath: \react-app\src\components\LanguageSwitcher\index.tsx
 * @Description: 语言切换组件
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Space, Spin } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useLanguageChange, getCurrentLanguage } from '@/i18n';
import './index.less';

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading, changeLanguage } = useLanguageChange();
  const currentLanguage = getCurrentLanguage();

  // 语言选项
  const languages = [
    { key: 'zh', label: t('language.zh'), flag: '🇨🇳' },
    { key: 'en', label: t('language.en'), flag: '🇺🇸' },
  ];

  // 切换语言
  const handleLanguageChange = async (languageKey: string) => {
    try {
      await changeLanguage(languageKey as 'zh' | 'en');
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // 下拉菜单项
  const items: MenuProps['items'] = languages.map(lang => ({
    key: lang.key,
    label: (
      <Space>
        <span>{lang.flag}</span>
        <span>{lang.label}</span>
        {currentLanguage === lang.key && <span>✓</span>}
      </Space>
    ),
    onClick: () => handleLanguageChange(lang.key),
  }));

  // 当前语言
  const currentLanguageInfo =
    languages.find(lang => lang.key === currentLanguage) || languages[0];

  return (
    <div className='language-switcher'>
      <Dropdown menu={{ items }} placement='bottomRight'>
        <Button type='text' icon={<GlobalOutlined />} disabled={isLoading}>
          <Space>
            {isLoading ? (
              <Spin size='small' />
            ) : (
              <span>{currentLanguageInfo.flag}</span>
            )}
            <span>{currentLanguageInfo.label}</span>
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
