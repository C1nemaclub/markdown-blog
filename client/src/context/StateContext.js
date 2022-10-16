import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [request, setRequest] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [canAccess, setCanAccess] = useState(false);

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
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.post('articles/new', data, options);
  }
  async function editArticle(data, id) {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.put(`articles/edit/${id}`, data, options);
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
  }

  return (
    <Context.Provider
      value={{
        articles,
        createArticle,
        deleteArticle,
        editArticle,
        makeRequest,
        searchArticles,
        canAccess,
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
