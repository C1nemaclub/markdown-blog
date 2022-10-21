import './App.css';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NewArticle from './pages/NewArticle';
import ViewArticle from './pages/ViewArticle';
import EditArticle from './pages/EditArticle';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/globalStyle';

function App() {
  useEffect(() => {
    document.title = 'CinemaCodes Blog';
  }, []);

  return (
    <div className='App'>
      <Router>
        <GlobalStyle />
        <Sidebar />
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin'>
            <Route index element={<Admin />} />
            <Route path='/admin/new' element={<NewArticle />} />
          </Route>
          <Route path='/article/:id' element={<ViewArticle />} />
          <Route path='/article/edit/:id' element={<EditArticle />} />
          <Route path='*' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
