import {createContext, useState, useContext} from 'react';
import isNil from 'lodash/isNil';

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
      body: isNil(body) ? null : JSON.stringify(body)
    });

    if (response.status !== 200) {
      throw 'Call Failed';
    }

    if (contentType !== JSON_STR) {
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
  const [user, setUser] = useState(null);

  const login = async (username, password) => {

    setLoading(true);

    const result = await authFetch('/open/login', POST, {
      username, password
    });

    setUser(result);
    setLoading(false);

    return result;
  }

  const createAccount = async (username, password, email) => {

    setLoading(true);

    const result = await authFetch('/open/createAccount', POST, {
      username, password, email
    });

    setLoading(false);
  };

  const context = {
    authFetch: async (api, method, body, contentType) => {
      return await authFetch(api, method, body, contentType);
    },
    login,
    createAccount,
    user
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