import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  lucario,
  okaidia,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function Form({ props, action }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: props.title || '',
    description: props.description || '',
    markdown: props.markdown || '',
    language: props.language || '',
  });
  const [tags, setTags] = useState('');
  const [tagArray, setTagArray] = useState(props.tags || []);

  const { createArticle, editArticle, makeRequest, searchArticles } =
    useStateContext();
  function onSubmit(e) {
    e.preventDefault();
    if (action === 'create') {
      createArticle({
        title: formData.title,
        description: formData.description,
        markdown: formData.markdown,
        tags: tagArray,
        language: formData.language,
      });
      makeRequest();
      searchArticles('');
      navigate(`/`);
    } else if (action === 'edit') {
      editArticle(
        {
          title: formData.title,
          description: formData.description,
          markdown: formData.markdown,
          tags: tagArray,
          language: formData.language,
        },
        props._id
      );
      searchArticles('');
      makeRequest();
      navigate(`/`);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function onTagChange(e) {
    const inputTags = e.target.value.split(',');
    setTags(e.target.value);
  }

  useEffect(() => {
    if (tags.includes(',')) {
      setTagArray((prev) => {
        return [...prev, tags.replace(',', '')];
      });
      setTags('');
    }
  }, [tags]);

  const tagElement = tagArray.map((item, index) => {
    return <span key={index}>{item}</span>;
  });

  return (
    <FormContainer>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='input-group'>
          <label htmlFor='title'>Title</label>
          <input
            autoComplete='off'
            type='text'
            name='title'
            id='title'
            value={formData.title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            autoComplete='off'
            name='description'
            id='description'
            cols='15'
            rows='3'
            value={formData.description}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>
        <div className='input-group'>
          <label htmlFor='markdown'>Markdown</label>
          <textarea
            autoComplete='off'
            name='markdown'
            id='markdown'
            cols='15'
            rows='6'
            value={formData.markdown}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>
        <div className='input-group'>
          <label htmlFor='type'>Language/Type</label>
          <input
            autoComplete='off'
            type='text'
            name='language'
            id='type'
            value={formData.language}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='tags'>
            Tags <span className='tags-span'>(Separated by commas)</span>
          </label>
          <input
            autoComplete='off'
            type='text'
            name='tags'
            id='tags'
            value={tags}
            onChange={(e) => onTagChange(e)}
          />
        </div>
        <div className='input-group'>
          <div className='current-tags'>{tagElement}</div>
        </div>
        <div className='input-group'>
          {action === 'edit' ? (
            <button type='submit' className='btn btn-edit'>
              Save
            </button>
          ) : (
            <button type='submit' className='btn btn-post'>
              Post
            </button>
          )}
        </div>
      </form>
      <div className='markdown-preview'>
        <h2>Markdown Preview</h2>
        <Markdown
          className='article-markdown'
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');

              return !inline && match ? (
                <SyntaxHighlighter
                  style={okaidia}
                  PreTag='div'
                  language={match[1]}
                  children={String(children).replace(/\n$/, '')}
                  {...props}
                />
              ) : (
                <code className={className ? className : ''} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {formData.markdown}
        </Markdown>
      </div>
    </FormContainer>
  );
}

const FormContainer = Styled.div`
margin-top: 1rem;
display: flex;
width: 100%;
justify-content: flex-start;
gap: 6rem;
form{
  min-width: 600px;
  .input-group{
    min-width: 600px;
    display: flex;
    flex-direction: column;
    width: 30%;
    border: 1px solid rgba(17,24,39, 0.9);
    margin-bottom: 1rem;
    padding: .3rem;
    border-radius: 5px;
    input,textarea, button{
      outline: none;
      border: 0;
      font-size: 1.1rem;
    }
    textarea{
      resize: none;
    }
    .btn{
        border-radius: 5px;
        font-size: 1.2rem;
        background: none;
        cursor: pointer;
        color: #fff;
        border: 0;
        a{
          color: #fff;
          text-decoration: none;
        }
        &:hover{
          filter: saturate(200%);
        }
    }
    .tags-span{
      color: gray;
      font-size: 0.9rem;
      margin-left: 1rem;
    }
  }
  .input-group:nth-child(7){
    background: #2ecc71;
    border: 0;
  }
  .input-group:nth-child(6){
    min-height: 30px;
  }
  
}
  .current-tags{
      display: flex;
      gap: 5px;
      span {
          border-radius: 5px;
          background: rgba(17,24,39,0.9);
          color: white;
          padding: .2rem;
      }
  }

  .markdown-preview{
    max-width: 600px;
      img{
        max-width: 600px;
        object-fit: cover;
      }
  }
    `;
