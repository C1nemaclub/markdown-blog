import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import ArticleCard from '../components/ArticleCard';
import { useStateContext } from '../context/StateContext';
import { FaKey } from 'react-icons/fa';

export default function Admin() {
  const navigate = useNavigate();
  const { deleteArticle, canAccess, checkAdminPassword, searchArticles } =
    useStateContext();
  const [passInput, setPassInput] = useState('');

  function handleDelete(id) {
    deleteArticle(id);
    //searchArticles('');
  }

  function verifyAccess(e) {
    e.preventDefault();
    checkAdminPassword(passInput);
  }

  return (
    <div className='page admin-page'>
      {canAccess && (
        <Container>
          <div className='buttons'>
            {/* <FaArrowLeft
              onClick={() => navigate('/')}
              className='icon arrow-left'
            /> */}
            <button
              onClick={() => navigate('/admin/new')}
              className='btn new-btn'
            >
              New
            </button>
          </div>
          <ArticlesContainer>
            <ArticleCard access='admin' handleClick={handleDelete} />
          </ArticlesContainer>
        </Container>
      )}
      {!canAccess && (
        <AdminFormContainer>
          <form onSubmit={(e) => verifyAccess(e)}>
            <div className='input-group'>
              <FaKey className='icon' />
              <input
                type='password'
                placeholder='Access key...'
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
              />
            </div>
            <div className='input-group'>
              <button type='submit'>Verify Access</button>
            </div>
          </form>
        </AdminFormContainer>
      )}
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

const Container = Styled.div`
  .buttons{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: .6rem;
      .arrow-left{
        font-size: 2rem;
        cursor: pointer;
        transition: .1s ease-in-out;
        color: black;
        &:hover{
          transform: scale(1.2)
        }
      }
      .new-btn{
        border: 0;
        width: 130px;
        height: 50px;
        border-radius: 5px;
        font-size: 1.2rem;
        cursor: pointer;
        background: #2ecc71;
        color: #fff;
        &:hover{
          filter: saturate(150%);
        }
      }
  }

`;

const AdminFormContainer = Styled.div`
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .input-group{
      padding: .4rem 1rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .8rem;
      input{
      font-size: 1.2rem;
      border: 0;
      outline: none;
    } svg{
      color: dodgerblue;
    }
    button{
      width: 100%;
      background: none;
      border: 0;
      font-size 1.2rem;
      cursor: pointer;
    }
    }
    .input-group:nth-child(2){
      margin-top: .6rem;
      background-color: rgba(17,24,39, 0.9);
      button{
        color: #fff;
      }
    }
    
  }

`;
