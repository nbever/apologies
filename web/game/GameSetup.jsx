import {useContext, useState, useEffect} from 'react';
import isNil from 'lodash/isNil';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {textFieldChanged} from '../utils/formUtils';
import {AuthContext} from '../AuthContext';

import {RED, BLUE, YELLOW, GREEN, defaultPlayerState, defaultGameState} from './constants';

import PlayerSetupPanel from './PlayerSetupPanel';
import {buffer} from '../theme';

const GameSetup = () => {

  const {user} = useContext(AuthContext);
  const [numberPlayers, setNumberOfPlayers] = useState(4);
  const [players, setPlayers] = useState([{user, color: BLUE}]);
  const colors = [BLUE, RED, GREEN, YELLOW];

  useEffect(() => {

    if (numberPlayers > players.length) {
      setPlayers(players.slice(1, players.length - 1));
    }
    else {
      const toCreate = numberPlayers - players.length;
      const newPlayers = [];

      for (let i = 0; i < toCreate; i++ ) {
        const newPlayer = clone(defaultPlayerState);

        const newColor = colors.find((color) => {
          const fullList = players.concat(newPlayers);
          return isNil(fullList.find((player) => {
            return player.color === color;
          }));
        });

        newPlayer.color = newColor;
        newPlayers.push(newPlayer);
      }

      setPlayers(players.concat(newPlayers));
    }
  }, [numberPlayers]);

  const getPlayerSetupPanels = () => {

    return players.map((player, index) => {
      return (
        <PlayerSetupPanel 
          key={`player-setup-panel-${index}`}
          player={player} 
          onColorChange={colorChange}
          onPlayerChange={playerChange}
          playerChoices={[]}
        />
      );
    });
  };

  const colorChange = (player, newColor) => {

  };

  const playerChange = (player, newUser) => {

  };

  return (
    <Box sx={{paddingTop: '12px'}}>
      <TextField 
        id="num_players"
        label="Number of Players"
        type="number"
        inputProps={{
          min: 2,
          max: 4
        }}
        value={numberPlayers}
        onChange={textFieldChanged(setNumberOfPlayers)}
      />
      {getPlayerSetupPanels()}
    </Box>
  );
};

export default GameSetup;