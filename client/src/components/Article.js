import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  lucario,
  okaidia,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useStateContext } from '../context/StateContext';
import Styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export default function Article(props) {
  const { id } = useParams();
  // {props: { title, sanitizedHtml, tags, date, markdown, description },}

  const { searchArticleById, singleArticle, isLoading } = useStateContext();
  useEffect(() => {
    searchArticleById(id);
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ArticleContainer>
      <h2 className='article-title'>{singleArticle.title}</h2>
      <span className='article-date'>{singleArticle.date}</span>
      <p className='article-desc'>{singleArticle.description}</p>
      <Markdown
        className='article-markdown'
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                style={okaidia}
                PreTag='div'
                language={match[1]}
                children={String(children).replace(/\n$/, '')}
                {...props}
              />
            ) : (
              <code className={className ? className : ''} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {singleArticle.markdown}
      </Markdown>
    </ArticleContainer>
  );
}

const ArticleContainer = Styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 60%;
    position: relative;
    padding: 1rem 2rem;
    height: 100%;
    .article-title{
      font-size: 2.6rem;
    }
    .article-date{
      color: darkgray;
    }
    .article-desc{
      font-size: 1.4rem;
    }

    .article-markdown{
      margin-top: .5rem;
    }

    pre{
      position: relative;
      padding: 1rem;
      //width: 65%;
      height: 100%;

    }
    img{
      max-width: 90%;
      object-fit: cover;
    }
    @media screen and (max-width: 1200px){
      width: 80%;
    }
`;
