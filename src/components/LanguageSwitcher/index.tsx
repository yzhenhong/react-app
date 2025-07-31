import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { languageManager } from '@/i18n/languageManager';
import './index.less';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  // 语言选项
  const languages = [
    { key: 'zh', label: t('language.zh'), flag: '🇨🇳' },
    { key: 'en', label: t('language.en'), flag: '🇺🇸' },
  ];

  // 切换语言
  const handleLanguageChange = async (languageKey: string) => {
    try {
      await languageManager.changeLanguage(languageKey as 'zh' | 'en');
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
      </Space>
    ),
    onClick: () => handleLanguageChange(lang.key),
  }));

  // 当前语言
  const currentLanguage =
    languages.find(lang => lang.key === i18n.language) || languages[0];

  return (
    <div className='language-switcher'>
      <Dropdown menu={{ items }} placement='bottomRight'>
        <Button type='text' icon={<GlobalOutlined />}>
          <Space>
            <span>{currentLanguage.flag}</span>
            <span>{currentLanguage.label}</span>
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
