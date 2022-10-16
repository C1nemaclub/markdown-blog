import React from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../components/Form';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function EditArticle() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  return (
    <div className='page edit-article-page'>
      <FaArrowLeft
        className='icon arrow-left'
        onClick={() => {
          navigate(-1);
        }}
      />
      <Form props={data} action='edit' />
    </div>
  );
}
