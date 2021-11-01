import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import {row, inputPadding} from '../theme';

import {BLUE, RED, GREEN, YELLOW} from './constants';

const PlayerSetupPanel = ({player, playerChoices, onPlayerChange, onColorChange, playerIndex, disableUser = false}) => {

  const colorMap = {
    BLUE: 'Blue',
    GREEN: 'Green',
    YELLOW: 'Yellow',
    RED: 'Red'
  };

  const getPlayerChoices = () => {
    return playerChoices.map((choice, index) => {
      return <MenuItem key={index} value={choice.username}>{choice.username}</MenuItem>;
    });
  };

  const getColorChoices = () => {
    return Object.keys(colorMap).map((key) => {
      return <MenuItem key={`color-${key}`} value={key}>{colorMap[key]}</MenuItem>;
    });
  };

  return (
    <Box>
      <Typography>Player {playerIndex}</Typography>
      <Box sx={row}>
        <Box sx={inputPadding}>
          <Select
            label="User"
            size="small"
            value={player.user.username}
            onChange={($e) => {
              onPlayerChange(player, $e.target.value);
            }}
            disabled={disableUser}
          >
            {getPlayerChoices()}
          </Select>
        </Box>
        <Box sx={inputPadding}>
          <Select
            label="Color"
            size="small"
            value={player.color}
            onChange={($e) => {
              onColorChange(player, $e.target.value);
            }}
          >
            {getColorChoices()}
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerSetupPanel;