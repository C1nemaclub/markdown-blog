import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lucario } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useStateContext } from '../context/StateContext';

export default function Article() {
  const { articles } = useStateContext();

  const articleElement = articles.map((article, index) => {
    return (
      <Markdown
        key={index}
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
        {article.markdown}
      </Markdown>
    );
  });

  return <div>{articleElement}</div>;
}
