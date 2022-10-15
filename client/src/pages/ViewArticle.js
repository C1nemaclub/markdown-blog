import React from 'react';
import Article from '../components/Article';
import { useLocation } from 'react-router-dom';

export default function ViewArticle() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div>
      <Article props={data} />
    </div>
  );
}
