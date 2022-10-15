import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
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
      'http://localhost:3000/passcheck',
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
      const response = await axios.get(
        'http://localhost:3000/articles',
        options
      );
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
    const response = await axios.get(
      `http://localhost:3000/articles?search=${query}`,
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
    const response = await axios.post(
      'http://localhost:3000/articles/new',
      data,
      options
    );
    setArticles(response.data);
  }
  async function editArticle(data, id) {
    console.log(id);

    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.put(
      `http://localhost:3000/articles/edit/${id}`,
      data,
      options
    );
  }

  async function deleteArticle(id) {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + adminPassword,
      },
    };
    const response = await axios.delete(
      `http://localhost:3000/articles/delete/${id}`,
      options
    );
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
