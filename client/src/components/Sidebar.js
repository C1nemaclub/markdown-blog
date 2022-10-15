import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import { Link } from 'react-router-dom';

const links = [
  {
    name: 'Home',
    type: '',
    active: true,
  },
  {
    name: 'Javascript',
    type: 'javascript',
    active: false,
  },
  {
    name: 'Python',
    type: 'python',
    active: false,
  },
  {
    name: 'Node',
    type: 'node',
    active: false,
  },
  {
    name: 'Html',
    type: 'html',
    active: false,
  },
  {
    name: 'Css',
    type: 'css',
    active: false,
  },
];

export default function Sidebar() {
  const [search, setSearch] = useState('');
  const [navLinks, setNavLinks] = useState(links);
  const { searchArticles, searchArticlesByLanguage } = useStateContext();

  const linkElements = navLinks.map((link, index) => {
    const activeStyle = {
      backgroundColor: link.active ? 'red' : 'dodgerblue',
      color: 'white',
    };
    return (
      <li
        key={index}
        onClick={() => setActiveAndSearch(link)}
        style={activeStyle}
      >
        {link.name}
      </li>
    );
  });

  function setActiveAndSearch(link) {
    setNavLinks((prev) => {
      return prev.map((item) => {
        if (item.name === link.name) {
          return { ...item, active: true };
        } else {
          return { ...item, active: false };
        }
      });
    });
    searchArticlesByLanguage(link.type);
  }

  return (
    <Container>
      <div className='sidebar'>
        <ul>{linkElements}</ul>
      </div>
      <div className='top-header'>
        <div className='group-input'>
          <input
            type='text'
            placeholder='Search bar...'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <FaSearch
            onClick={() => searchArticles(search)}
            className='search-icon icon'
          />
        </div>
        <Link to='/contact'>Contact</Link>
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
        padding: 1rem 3rem;
        width: 50%;
        margin-left: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .group-input{
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #ccc;
          border-radius: 5px;
          max-width: 300px;
          width: 100%;
          padding: .4rem 1rem;
          input{
            font-size: 1.1rem;
            border: 0;
            outline: none;
          }
          .search-icon{
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
        a{
          text-decoration: none;
          font-size: 1.3rem;
          color: dodgerblue;

        }
    }
`;
