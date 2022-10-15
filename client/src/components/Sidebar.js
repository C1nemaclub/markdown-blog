import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Styled from 'styled-components';
import { useStateContext } from '../context/StateContext';

export default function Sidebar() {
  const [search, setSearch] = useState('');

  const { searchArticles } = useStateContext();
  return (
    <Container>
      <div className='sidebar'>
        <ul>
          <li>Home</li>
          <li>Topics</li>
          <li>Javascript</li>
          <li>Python</li>
          <li>React</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Node.js</li>
        </ul>
      </div>
      <div className='top-header'>
        <div className='group-input'>
          <input
            type='text'
            placeholder='Search bar...'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <FaSearch onClick={() => searchArticles(search)} />
        </div>
      </div>
    </Container>
  );
}

const Container = Styled.div`
    .sidebar{
    position: fixed;
    min-height:100vh;
    border: 1px solid red;
    height: 100%;
    min-width: 100px;
    max-width: 250px;
    width: 10%;
    ul{
        padding: 1rem;
            list-style: none;
            
            li{
                margin-bottom: .4rem;
            }
        }
    }
    .top-header{
        position: relative;
        border: 1px solid dodgerblue;
        padding: 1rem;
        width: 70%;
        margin-left: auto;
    }
`;
