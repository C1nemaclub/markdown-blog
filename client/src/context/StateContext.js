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

  return (
    <Context.Provider
      value={{
        articles,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
