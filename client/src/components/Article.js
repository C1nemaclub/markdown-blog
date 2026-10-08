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
const UrlPart1 =
  'https://firebasestorage.googleapis.com/v0/b/uploadingimage-71d87.appspot.com/o/';

const UrlPart2 = '?alt=media&token=3bcda11d-9a75-4b78-a175-7236b6cebe88';

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
  console.log(singleArticle);

  return (
    <ArticleContainer>
      {singleArticle.imageRef && (
        <div className='img-container'>
          <img
            src={`${UrlPart1}${singleArticle.imageRef}${UrlPart2}`}
            alt='cover'
          />
        </div>
      )}
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
                wrapLongLines={true}
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
    .img-container{
      width: 100%;
      height: 400px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
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
