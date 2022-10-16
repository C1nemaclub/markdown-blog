import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lucario } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useStateContext } from '../context/StateContext';
import Styled from 'styled-components';

export default function Article({
  props: { title, sanitizedHtml, tags, date, markdown, description },
}) {
  return (
    <ArticleContainer>
      <h2 className='article-title'>{title}</h2>
      <span className='article-date'>{date}</span>
      <p className='article-desc'>{description}</p>
      <Markdown
        className='article-markdown'
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                style={lucario}
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
        {markdown}
      </Markdown>
    </ArticleContainer>
  );
}

const ArticleContainer = Styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 60%;
    position: relative;
    padding: 1rem;
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
      width: 65%;
      height: 100%;
    }
    
`;
