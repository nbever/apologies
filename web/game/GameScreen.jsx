import {useState} from 'react';
import Box from '@mui/material/Box';

import {defaultGameState} from './constants';
import TurnBar from './TurnBar';
import PlayArea from './PlayArea';

import {
  fullScreen,
  column,
  stiff,
  stretch
} from '../theme';

const GameScreen = ({gameId}) => {

  const [gameState, setGameState] = useState(defaultGameState);

  return (
    <Box 
      sx={{...fullScreen, ...column}} 
    >
      <Box sx={{...stiff}}>
        <TurnBar />
      </Box>
      <Box sx={{...stretch}}>
        <PlayArea gameState={gameState}/>
      </Box>
    </Box>
  );
};

export default GameScreen;