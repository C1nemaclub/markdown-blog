import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Styled from 'styled-components';
import { useStateContext } from '../context/StateContext';

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
        return [...prev, tags];
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
            type='text'
            name='title'
            id='title'
            value={formData.title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            cols='15'
            rows='5'
            value={formData.description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className='input-group'>
          <label htmlFor='markdown'>Markdown</label>
          <textarea
            name='markdown'
            id='markdown'
            cols='15'
            rows='5'
            value={formData.markdown}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className='input-group'>
          <label htmlFor='tags'>Tags</label>
          <input
            type='text'
            name='tags'
            id='tags'
            value={tags}
            onChange={(e) => onTagChange(e)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='title'>Type</label>
          <input
            type='text'
            name='language'
            id='title'
            value={formData.language}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='input-group'>
          <div className='current-tags'>{tagElement}</div>
        </div>
        <div className='input-group'>
          {action === 'edit' ? (
            <button type='submit' className='btn btn-primary'>
              Edit
            </button>
          ) : (
            <button type='submit' className='btn btn-primary'>
              Create
            </button>
          )}
        </div>
      </form>
    </FormContainer>
  );
}

const FormContainer = Styled.div`
    
        .current-tags{
            display: flex;
            gap: 5px;
            span {
                border: 1px solid red;
                border-radius: 5px;
            }
        }
    `;
