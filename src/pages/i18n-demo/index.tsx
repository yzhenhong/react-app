import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography, Space, Button, Divider } from 'antd';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import './index.less';

const { Title, Paragraph, Text } = Typography;

const I18nDemo: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className='i18n-demo-page'>
      <Card>
        <Title level={2}>{t('language.switchLanguage')}</Title>

        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          {/* 语言切换器 */}
          <div>
            <Title level={4}>语言切换器</Title>
            <LanguageSwitcher />
          </div>

          <Divider />

          {/* 当前语言信息 */}
          <div>
            <Title level={4}>当前语言信息</Title>
            <Paragraph>
              <Text strong>当前语言：</Text> {i18n.language}
            </Paragraph>
            <Paragraph>
              <Text strong>回退语言：</Text>{' '}
              {i18n.options.fallbackLng as string}
            </Paragraph>
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
                onClick={() => i18n.changeLanguage('zh')}
                disabled={i18n.language === 'zh'}
              >
                切换到中文
              </Button>
              <Button
                type='primary'
                onClick={() => i18n.changeLanguage('en')}
                disabled={i18n.language === 'en'}
              >
                Switch to English
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
        </Space>
      </Card>
    </div>
  );
};

export default I18nDemo;
