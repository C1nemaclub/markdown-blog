import React from 'react';
import Form from '../components/Form';
import { FaArrowLeft } from 'react-icons/fa';
import Styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
export default function NewArticle() {
  const navigate = useNavigate();
  return (
    <div className='page new-article-page'>
      <Container>
        <FaArrowLeft
          className='icon arrow-left'
          onClick={() => {
            navigate(-1);
          }}
        />
        <Form
          action='create'
          props={{ title: '', description: '', markdown: '' }}
        />
      </Container>
    </div>
  );
}

const Container = Styled.div`
.arrow-left{
        font-size: 2rem;
        cursor: pointer;
        transition: .1s ease-in-out;
        color: black;
        &:hover{
          transform: scale(1.2)
        }
      }
`;
