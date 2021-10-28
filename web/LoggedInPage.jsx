import{useContext} from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import isNil from 'lodash/isNil';

import {AuthContext} from './AuthContext';
import {GameContextProvider} from './game/GameContext';

import {stretch, stiff, column, fullScreen} from './theme';

import Box from '@mui/material/Box';
import GameScreen from './game/GameScreen';
import Banner from './Banner';
import Dashboard from './Dashboard';
import GameSetup from './game/GameSetup';
import FriendList from './FriendList';

const LoggedInPage = () => {

  const history = useHistory();
  const {user} = useContext(AuthContext);

  if (isNil(user)) {
    history.push('/login');
    return null;
  }

  return (
    <GameContextProvider>
      <Box sx={{...column, ...fullScreen}}>
        <Banner />
        <Box sx={stretch}>
          <Switch>
            <Route 
              path="/app/game" 
              render={() => {
                return <GameScreen />;
              }}
            />
            <Route path="/app/newGame" component={GameSetup} />
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/friendList" component={FriendList} />
            <Redirect to="/app/dashboard" />
          </Switch>
        </Box>
      </Box>
    </GameContextProvider>
  );
};

export default LoggedInPage;