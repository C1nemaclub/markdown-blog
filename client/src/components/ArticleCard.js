import React from 'react';
import Styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import { useNavigate, Link } from 'react-router-dom';
const UrlPart1 =
  'https://firebasestorage.googleapis.com/v0/b/uploadingimage-71d87.appspot.com/o/';

const UrlPart2 = '?alt=media&token=3bcda11d-9a75-4b78-a175-7236b6cebe88';

export default function ArticleCard({ access, handleClick }) {
  const navigate = useNavigate();
  const { articles } = useStateContext();

  const articleCardElement = articles.map((article) => {
    return (
      <Card key={article._id}>
        {article.imageRef && (
          <div className='img-container'>
            <img
              src={`${UrlPart1}${article.imageRef}${UrlPart2}`}
              alt='cover'
            />
          </div>
        )}
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <span className='date'>{article.date}</span>
        <button className='btn read-btn'>
          <Link to={`/article/${article._id}`} state={{ data: article }}>
            READ MORE...
          </Link>
        </button>
        {access && (
          <div className='button-container'>
            <button className='btn edit-btn'>
              <Link
                to={`/article/edit/${article._id}`}
                state={{ data: article }}
              >
                Edit
              </Link>
            </button>
            <button
              onClick={() => handleClick(article._id)}
              className='btn danger-btn'
            >
              Delete
            </button>
          </div>
        )}
      </Card>
    );
  });

  return (
    <>
      {articles.length >= 1 ? (
        articleCardElement
      ) : (
        <div className='no-articles'>No articles where found</div>
      )}
    </>
  );
}

const Card = Styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    max-width: 550px;
    width: 50%;
    padding: 1rem;
    gap: .5rem;
    border-radius:5px;
    border: 1px solid #ccc;
    transition: .14s ease-in-out;
    box-shadow: none;
    cursor: pointer;
    &:hover{
      box-shadow: 9px 5px 0px -3px rgba(184,184,184,1);

    }
    .img-container{
      width: 100%;
      height: 300px;
      img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position:  center;
      }
    }

    h2{
        font-size: 2rem;
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height:100px;
        height: 100px;
    }
    p{
        font-size: 1.3rem;
    }
    .date{
      color: darkgray;
    }
    .read-btn{
        width: 130px;
        height: 50px;
        border-radius: 5px;
        font-size: 1.2rem;
        margin-top: .5rem;
        border: 0;
        cursor: pointer;
        background-color: transparent;
      a{
        text-decoration: none;
        color: dodgerblue;
        transition: .14s ease-in-out;
        &:hover{
          font-weight: 700;
        }
      }
    }
    .button-container{
      width: 100%;
      margin-left: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0rem .3rem;
      gap: 1rem;
      .btn{
        border: 1px solid #ccc;
        width: 130px;
        height: 50px;
        border-radius: 5px;
        font-size: 1.2rem;
        cursor: pointer;
        border: 0;
        a{
          color: #fff;
          text-decoration: none;
        }
        &:hover{
          filter: saturate(200%);
        }
      }
      .edit-btn{
        background: dodgerblue;
      }
      .danger-btn{
        background: #C70000;
        color: #fff;
        a{
          color: white;
        }
      }
    }
    @media screen and (max-width: 824px){
      width: 80%;
    }
`;
