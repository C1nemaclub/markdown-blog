import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import ArticleCard from '../components/ArticleCard';
import { useStateContext } from '../context/StateContext';

export default function Admin() {
  const navigate = useNavigate();
  const { deleteArticle } = useStateContext();

  function handleDelete(id) {
    deleteArticle(id);
  }

  return (
    <div className='page admin-page'>
      <button onClick={() => navigate('/')}>Admin</button>
      <button onClick={() => navigate('/admin/new')}>New</button>
      <ArticlesContainer>
        <ArticleCard access='admin' handleClick={handleDelete} />
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
