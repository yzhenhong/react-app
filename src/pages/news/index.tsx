import React from 'react';
import './index.less';

const News: React.FC = () => {
  return (
    <div className='news-page'>
      <h1 className='news-title'>新闻页面</h1>
      <div className='news-content'>
        <p>这是新闻页面的内容</p>
        <ul className='news-list'>
          <li>新闻标题 1</li>
          <li>新闻标题 2</li>
          <li>新闻标题 3</li>
        </ul>
      </div>
    </div>
  );
};

export default News;
