import {
  Switch,
  Route
} from 'react-router-dom';

import {stretch, stiff, column, fullScreen} from './theme';

import Box from '@mui/material/Box';
import GameScreen from './game/GameScreen';
import Banner from './Banner';

const LoggedInPage = () => {

  return (
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
        </Switch>
      </Box>
    </Box>
  );
};

export default LoggedInPage;