import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [singleArticle, setSingleArticle] = useState({});
  const [request, setRequest] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [canAccess, setCanAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function makeRequest() {
    setRequest((prev) => !prev);
  }

  async function checkAdminPassword(inputPassword) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer 123456',
      },
    };
    const response = await axios.post(
      'articles/passcheck',
      { password: inputPassword },
      options
    );

    if (response.data.canAccess) {
      setCanAccess(true);
      setAdminPassword(response.data.adminPass);
    }
  }

  useEffect(() => {
    async function getData() {
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + adminPassword,
        },
      };
      const response = await axios.get('articles', options);
      setArticles(response.data);
    }
    getData();
  }, [request]);

  async function searchArticles(query) {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.get(`articles?search=${query}`, options);
    setArticles(response.data);
  }

  async function searchArticlesByLanguage(query) {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.get(
      `articles/language?search=${query}`,
      options
    );
    setArticles(response.data);
  }

  async function createArticle(data) {
    console.log(data);
    const multiFormData = new FormData();
    multiFormData.append('title', data.title);
    multiFormData.append('description', data.description);
    multiFormData.append('language', data.language);
    multiFormData.append('markdown', data.markdown);
    multiFormData.append('tags', data.tags);
    multiFormData.append('file', data.file);
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.post('articles/new', multiFormData, {
      headers: {
        Authorization: 'Bearer ' + adminPassword,
      },
    });

    if (response.status === 200) {
      toast.success('Article successfully created');
    } else {
      toast.error('there was a problem creating the Article');
    }
  }
  async function editArticle(data, id) {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.put(`/articles/edit/${id}`, data, options);
    if (response.status === 200) {
      toast.success('Article successfully edited');
    } else {
      toast.error('there was a problem editing the Article');
    }
  }

  async function deleteArticle(id) {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.delete(`articles/delete/${id}`, options);
    if (response.status === 200) {
      setArticles((prev) => {
        return prev.filter((article) => {
          return article._id !== id;
        });
      });
      toast.success('Article successfully deleted');
    } else {
      toast.error('there was a problem deleting the Article');
    }
  }

  async function searchArticleById(id) {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    setIsLoading(true);
    const response = await axios.get(`/articles/searchId/${id}`, options);
    setSingleArticle(response.data);
    setIsLoading(false);
  }

  return (
    <Context.Provider
      value={{
        articles,
        singleArticle,
        createArticle,
        deleteArticle,
        editArticle,
        makeRequest,
        searchArticles,
        searchArticleById,
        canAccess,
        isLoading,
        checkAdminPassword,
        searchArticlesByLanguage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
