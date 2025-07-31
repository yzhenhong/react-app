import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography, Space, Button, Divider, Alert, Tag } from 'antd';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  useLanguageChange,
  getCurrentLanguage,
  getSupportedLanguages,
  resetLanguage,
} from '@/i18n';
import './index.less';

const { Title, Paragraph, Text } = Typography;

const I18nDemo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isLoading, changeLanguage } = useLanguageChange();
  const currentLanguage = getCurrentLanguage();

  return (
    <div className='i18n-demo-page'>
      <Card>
        <Title level={2}>{t('language.switchLanguage')}</Title>

        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          {/* 持久化功能说明 */}
          <Alert
            message='语言持久化功能'
            description='现在语言选择会自动保存到本地存储，刷新页面后不会丢失。'
            type='info'
            showIcon
          />

          {/* 语言切换器 */}
          <div>
            <Title level={4}>语言切换器</Title>
            <LanguageSwitcher />
          </div>

          <Divider />

          {/* 当前语言信息 */}
          <div>
            <Title level={4}>当前语言信息</Title>
            <Space direction='vertical'>
              <Paragraph>
                <Text strong>当前语言：</Text>
                <Tag color='blue'>{currentLanguage}</Tag>
                {isLoading && <Tag color='orange'>切换中...</Tag>}
              </Paragraph>
              <Paragraph>
                <Text strong>i18n 语言：</Text>
                <Tag color='green'>{i18n.language}</Tag>
              </Paragraph>
              <Paragraph>
                <Text strong>回退语言：</Text>
                <Tag color='purple'>{i18n.options.fallbackLng as string}</Tag>
              </Paragraph>
              <Paragraph>
                <Text strong>支持的语言：</Text>
                {getSupportedLanguages().map(lang => (
                  <Tag key={lang} color='green'>
                    {lang} ✓
                  </Tag>
                ))}
              </Paragraph>
            </Space>
          </div>

          <Divider />

          {/* 多语言内容示例 */}
          <div>
            <Title level={4}>多语言内容示例</Title>

            <Space direction='vertical' size='middle'>
              <Card size='small'>
                <Title level={5}>通用文本</Title>
                <Paragraph>
                  <Text>欢迎：</Text> {t('common.welcome')}
                </Paragraph>
                <Paragraph>
                  <Text>登录：</Text> {t('common.login')}
                </Paragraph>
                <Paragraph>
                  <Text>提交：</Text> {t('common.submit')}
                </Paragraph>
              </Card>

              <Card size='small'>
                <Title level={5}>导航文本</Title>
                <Paragraph>
                  <Text>首页：</Text> {t('nav.home')}
                </Paragraph>
                <Paragraph>
                  <Text>新闻：</Text> {t('nav.news')}
                </Paragraph>
                <Paragraph>
                  <Text>设置：</Text> {t('nav.settings')}
                </Paragraph>
              </Card>

              <Card size='small'>
                <Title level={5}>页面文本</Title>
                <Paragraph>
                  <Text>欢迎页面标题：</Text> {t('pages.welcome.title')}
                </Paragraph>
                <Paragraph>
                  <Text>欢迎页面副标题：</Text> {t('pages.welcome.subtitle')}
                </Paragraph>
                <Paragraph>
                  <Text>登录页面标题：</Text> {t('pages.login.title')}
                </Paragraph>
              </Card>
            </Space>
          </div>

          <Divider />

          {/* 动态切换演示 */}
          <div>
            <Title level={4}>动态切换演示</Title>
            <Space>
              <Button
                type='primary'
                onClick={() => changeLanguage('zh')}
                disabled={currentLanguage === 'zh' || isLoading}
                loading={isLoading && currentLanguage !== 'zh'}
              >
                切换到中文
              </Button>
              <Button
                type='primary'
                onClick={() => changeLanguage('en')}
                disabled={currentLanguage === 'en' || isLoading}
                loading={isLoading && currentLanguage !== 'en'}
              >
                Switch to English
              </Button>
              <Button danger onClick={resetLanguage} disabled={isLoading}>
                重置语言设置
              </Button>
            </Space>
          </div>

          <Divider />

          {/* 插值示例 */}
          <div>
            <Title level={4}>插值示例</Title>
            <Paragraph>{t('pages.welcome.description')}</Paragraph>
            <Paragraph>
              <Text code>用户名：admin</Text> | <Text code>密码：123456</Text>
            </Paragraph>
          </div>

          <Divider />

          {/* 持久化测试说明 */}
          <div>
            <Title level={4}>持久化测试</Title>
            <Alert
              message='测试步骤'
              description={
                <ul>
                  <li>1. 点击上方按钮切换到英文</li>
                  <li>2. 刷新页面（F5 或 Ctrl+R）</li>
                  <li>3. 观察语言是否保持为英文</li>
                  <li>4. 点击&ldquo;重置语言设置&rdquo;可以恢复到默认中文</li>
                </ul>
              }
              type='success'
              showIcon
            />
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default I18nDemo;
