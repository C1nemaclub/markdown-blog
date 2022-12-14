import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import { Link } from 'react-router-dom';
import {
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaHome,
  FaJsSquare,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa';
import { FiX, FiMenu } from 'react-icons/fi';

const links = [
  {
    name: 'Home',
    type: '',
    active: true,
    logo: 'home',
  },
  {
    name: 'Javascript',
    type: 'javascript',
    active: false,
    logo: 'javascript',
  },
  {
    name: 'Python',
    type: 'python',
    active: false,
    logo: 'python',
  },
  {
    name: 'Node',
    type: 'node',
    active: false,
    logo: 'node',
  },
  {
    name: 'Html',
    type: 'html',
    active: false,
    logo: 'html',
  },
  {
    name: 'Css',
    type: 'css',
    active: false,
    logo: 'css',
  },
];

export default function Sidebar() {
  const [menuState, setMenuState] = useState(false);
  const [search, setSearch] = useState('');
  const [navLinks, setNavLinks] = useState(links);
  const { searchArticles, searchArticlesByLanguage } = useStateContext();

  const { pathname } = useLocation();

  useEffect(() => {
    if (window.screen.width <= 1200) {
      setMenuState(true); // Close the navigation panel
    }
  }, [pathname, navLinks]);

  function onSearch(e) {
    e.preventDefault();
    searchArticles(search);
  }

  const linkElements = navLinks.map((link, index) => {
    const customClass = link.active ? 'activeLink' : '';
    return (
      <li
        className={customClass}
        key={index}
        onClick={() => setActiveAndSearch(link)}
      >
        {link.logo === 'python' ? (
          <FaPython />
        ) : '' || link.logo === 'html' ? (
          <FaHtml5 />
        ) : '' || link.logo === 'css' ? (
          <FaCss3Alt />
        ) : '' || link.logo === 'javascript' ? (
          <FaJsSquare />
        ) : '' || link.logo === 'node' ? (
          <FaNodeJs />
        ) : '' || link.logo === 'home' ? (
          <FaHome />
        ) : (
          ''
        )}
        <Link to='/'>{link.name}</Link>
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
  function menuToggle() {
    setMenuState((prev) => !prev);
  }

  return (
    <Container>
      {menuState ? (
        <FiMenu className='menu-icon menu-close' onClick={menuToggle} />
      ) : (
        <FiX className='menu-icon menu-open' onClick={menuToggle} />
      )}
      <div className='sidebar' style={{ left: menuState ? '-60%' : '0%' }}>
        <ul>
          <li>
            <Link to='/'>
              <FaCode />
            </Link>
          </li>
          {linkElements}
          <li className='socials'>
            <a
              href='https://github.com/C1nemaclub'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub className='icon icon-socials' />
            </a>
            <a
              href='https://www.linkedin.com/in/santiago-velasquez-426719243/'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedin className='icon icon-socials' />
            </a>
            <Link
              to='#'
              onClick={() => (window.location = 'mailto:yourmail@domain.com')}
            >
              <FaEnvelope className='icon icon-socials' />
            </Link>
          </li>
        </ul>
      </div>
      <div className='top-header'>
        <form onSubmit={(e) => onSearch(e)}>
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
        </form>
        {/* <Link to='/contact'>Contact</Link> */}
      </div>
    </Container>
  );
}

const Container = Styled.div`

    .sidebar{
    position: fixed;
    min-height:100vh;
    height: 100%;
    min-width: 130px;
    max-width: 250px;
    width: 10%;
    background-color: rgba(17,24,39, 0.9);
    z-index: 1000;
    transition: .14s ease-in-out;
    ul{
        padding: 1rem;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content:center;
        height: 60%;
        li{
            margin-bottom: .8rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: .4rem;
            padding:  .1rem .5rem;
            cursor: pointer;
            svg{
              color: rgba(156,163,175,1);
              font-size: 1.2rem;
            }
            a{
              text-decoration: none;
              color: rgba(156,163,175,1);
              font-size: 1.1rem
              }
              &:hover{
                background: rgba(100,100,100,.5);
              }
            }
            li:nth-child(1){
            margin-bottom: auto;
            justify-content: center;
              svg{
                color: #fff;
                font-size: 4rem;
              }
        }
        .socials{
          margin-top: auto;
                display: flex;
                justify-content: center;
                gap: .5rem;
                align-items: center;
                padding: .2rem;
                border-radius: 5px;
                svg{
                  font-size: 1.6rem;
                  &:hover{
                    color: dodgerblue;
                  }
                }
              }
        }
        .activeLink{
          background: rgba(100,100,100,.8);
          border-radius: 5px;
          svg{
            color: white;
          }
          a{
            color: white;
          }
        }
    }
    .top-header{
        position: relative;
        padding: 1rem 3rem;
        width: 70%;
        margin-left: 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        //background-color: rgba(17,24,39, 0.9);
        background: #fff;

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
            background: none;
            width: 60%;
          }
          .search-icon{
            font-size: 1.5rem;
            cursor: pointer;
            transition: .1s ease-in-out;
              &:hover{
                color: dodgerblue;
                scale:1.2;
              }
          }
        }
        a{
          text-decoration: none;
          font-size: 1.3rem;
          color: dodgerblue;
        }
    }
    .menu-icon{
      font-size: 2.2rem;
      position: absolute;
      z-index: 999999;
      left: 3%;
      top: 3%;
      cursor: pointer;
      display: none;
    }
    .menu-open{
      color: #fff;
    }
    .menu-close{
      color: rgba(17,24,39, 0.9);
    }
    @media screen and (max-width: 1200px) {
      .sidebar{
        width: 16%;
        ul li a{
          font-size: .9rem;
        }
      }
      .top-header{
        margin-left: 14%;
      }
    }
    @media screen and (max-width: 1200px){
      .sidebar{
        left: 60%;
      }
      .menu-icon{
        display: block;
      }
    }


`;
