import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Styled from 'styled-components';

export default function Home() {
  return (
    <div className='page home-page'>
      <ArticlesContainer>
        <ArticleCard />
      </ArticlesContainer>
    </div>
  );
}

const ArticlesContainer = Styled.div`
margin-top: 2rem;
display: flex;
width: 100%;
flex-wrap: wrap;
gap:  5rem 1rem;
justify-content: flex-start;
`;
