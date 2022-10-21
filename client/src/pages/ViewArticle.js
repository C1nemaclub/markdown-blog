import React from 'react';
import Article from '../components/Article';
import { useLocation } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';

export default function ViewArticle() {
  const location = useLocation();
  const data = location.state?.data;
  const { articles, singleArticle } = useStateContext();

  const recentArticles = articles
    .map((article) => {
      if (singleArticle.title === article.title) return;
      return (
        <ArticleCard key={article._id}>
          <h3 className='article-title'>{article.title}</h3>
          <span className='article-date'>{article.date}</span>
          <p className='article-desc'>{article.description}</p>
          <Link to={`/article/${article._id}`} state={{ data: article }}>
            READ MORE...
          </Link>
        </ArticleCard>
      );
    })
    .slice(0, 6);

  return (
    <div className='page view-article-page'>
      <Article props={data} />
      <div className='recent-articles-container'>{recentArticles}</div>
    </div>
  );
}

const ArticleCard = Styled.div`
  position: relative;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: .4rem;
  width: 100%;
  min-width: 300px;
  cursor: pointer;
    .article-title{
      font-size: 1.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 315px;
    }
    .article-desc{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 315px;
    }
    .article-date{
      font-size: .9rem;
      color: darkgray;
    }
    a{
      text-decoration: none;
      color: dodgerblue;
      transition: .1s ease-in-out;
        &:hover{
          font-weight: 800;
        }
    }

`;
