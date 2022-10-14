import React from 'react';
import Article from '../components/Article';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/admin')}>Admin</button>
      <Article />
    </div>
  );
}
