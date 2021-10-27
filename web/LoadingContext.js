import {createContext, useState} from 'react';

const LoadingContext = createContext({});

const LoadingProvider = ({children}) => {

  const [isLoading, setLoading] = useState(false);

  const context = {
    isLoading,
    setLoading
  };

  return (
    <LoadingContext.Provider value={context}>
      {children}
    </LoadingContext.Provider>
  );
};

export {
  LoadingProvider,
  LoadingContext
};