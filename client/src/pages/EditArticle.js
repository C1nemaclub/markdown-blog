import React from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../components/Form';

export default function EditArticle() {
  const location = useLocation();
  const data = location.state?.data;
  return (
    <div className='page edit-article-page'>
      <Form props={data} action='edit' />
    </div>
  );
}
