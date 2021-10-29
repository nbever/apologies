import {createContext, useContext} from 'react';

import {AuthContext, GET, POST, DELETE} from '../AuthContext';

const GameContext = createContext({});

const GameContextProvider = ({children}) => {

  const {authFetch} = useContext(AuthContext);

  const findUsers = async (searchTerm) => {
    const matches = await authFetch(`/api/findUsers/${searchTerm}`, GET);
    return matches;
  };

  const addFriends = async (friendIdList) => {

    await authFetch(`/api/friends`, POST, {
      friendIds: friendIdList
    });
  };

  const removeFriend = async (friend_id) => {
    await authFetch(`/api/friends/${friend_id}`, DELETE);
  };

  const getMyFriends = async () => {
    const friends = await authFetch('/api/friends', GET);
    return friends;
  };

  const context = {
    findUsers,
    addFriends,
    getMyFriends,
    removeFriend
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