import React from 'react';
import Form from '../components/Form';

export default function NewArticle() {
  return (
    <div className='page new-article-page'>
      <Form
        action='create'
        props={{ title: '', description: '', markdown: '' }}
      />
    </div>
  );
}
