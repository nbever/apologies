import {createContext, useState, useContext, useEffect} from 'react';

import {LoadingContext} from './LoadingContext';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
const JSON_STR = 'application/json';

const AuthContext = createContext({});

const authFetch = async (api, method = GET, body = null, 
  contentType = JSON_STR) => {

  try {
    const response = await fetch(api, {
      method: method,
      headers: new Headers({
        'Content-Type': contentType
      }),
      body: JSON.stringify(body)
    });

    if (response.status !== 200) {
      throw 'Call Failed';
    }

    console.log(contentType);
    if (contentType !== JSON) {
      const arrayBuffer = await response.arrayBuffer();
      const objectURL = URL.createObjectURL(new Blob([arrayBuffer]));
      return objectURL;
    }

    const json = await response.json();
    return json;
  }
  catch (err) {
    console.log(err);
    return null;
  }
};

const AuthContextProvider = ({children}) => {

  const {setLoading} = useContext(LoadingContext);

  const login = async (username, password) => {

    setLoading(true);

    const result = await authFetch('/api/login', POST, {
      username, password
    });

    setLoading(false);
  }

  const context = {
    authFetch: async (api, method, body, contentType) => {
      return await authFetch(api, method, body, contentType);
    },
    login
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthContextProvider
};