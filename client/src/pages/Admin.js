import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import ArticleCard from '../components/ArticleCard';
import { useStateContext } from '../context/StateContext';

export default function Admin() {
  const navigate = useNavigate();
  const { deleteArticle, canAccess, checkAdminPassword, searchArticles } =
    useStateContext();
  const [passInput, setPassInput] = useState('');

  function handleDelete(id) {
    deleteArticle(id);
    searchArticles('');
  }

  function verifyAccess(e) {
    e.preventDefault();
    checkAdminPassword(passInput);
  }

  return (
    <div className='page admin-page'>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => console.log('')}>test</button>
      <button onClick={() => navigate('/admin/new')}>New</button>
      {canAccess && (
        <ArticlesContainer>
          <ArticleCard access='admin' handleClick={handleDelete} />
        </ArticlesContainer>
      )}
      {!canAccess && (
        <div className='admin-password'>
          <form onSubmit={(e) => verifyAccess(e)}>
            <input
              type='text'
              placeholder='password'
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
            />
          </form>
        </div>
      )}
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
