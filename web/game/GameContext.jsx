import {createContext, useContext} from 'react';

import {AuthContext, GET} from '../AuthContext';

const GameContext = createContext({});

const GameContextProvider = ({children}) => {

  const {authFetch} = useContext(AuthContext);

  const findUsers = async (searchTerm) => {
    const matches = await authFetch(`/api/findUsers/${searchTerm}`, GET);
    return matches;
  };

  const context = {
    findUsers
  };

  return (
    <GameContext.Provider value={context}>
      {children}
    </GameContext.Provider>
  );

};

export {
  GameContext,
  GameContextProvider
};