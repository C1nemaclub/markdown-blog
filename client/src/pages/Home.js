import React from 'react';
import Article from '../components/Article';
import ArticleCard from '../components/ArticleCard';
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className='page home-page'>
      <button onClick={() => navigate('/admin')}>Admin</button>
      <ArticlesContainer>
        <ArticleCard />
      </ArticlesContainer>
    </div>
  );
}

const ArticlesContainer = Styled.div`
margin-top: 2rem;
border: 1px solid red;
display: flex;
width: 100%;
flex-wrap: wrap;
gap:  10rem 1rem;
justify-content: center;

`;
