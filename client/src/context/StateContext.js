import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const Context = createContext();

export const StateContext = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getData() {
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer 123456',
        },
      };
      const response = await axios.get(
        'http://localhost:3000/articles',
        options
      );
      setArticles(response.data);
    }
    getData();
  }, []);

  async function createArticle(data) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer 123456',
      },
    };
    const response = await axios.post(
      'http://localhost:3000/articles/new',
      data,
      options
    );
  }

  async function deleteArticle(id) {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer 123456',
      },
    };
    const response = await axios.delete(
      `http://localhost:3000/articles/delete/${id}`,
      options
    );
    console.log(response.data.message);
  }

  return (
    <Context.Provider
      value={{
        articles,
        createArticle,
        deleteArticle,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
