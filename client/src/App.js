import './App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NewArticle from './pages/NewArticle';
import ViewArticle from './pages/ViewArticle';
import EditArticle from './pages/EditArticle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/globalStyle';

function App() {
  useEffect(() => {
    document.title = 'Markdown blog';
  }, []);

  return (
    <div className='App'>
      <Router>
        <GlobalStyle />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin'>
            <Route index element={<Admin />} />
            <Route path='/admin/new' element={<NewArticle />} />
          </Route>
          <Route path='/article/:id' element={<ViewArticle />} />
          <Route path='/article/edit/:id' element={<EditArticle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
