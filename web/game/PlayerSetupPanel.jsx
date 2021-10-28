import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {BLUE, RED, GREEN, YELLOW} from './constants';

const PlayerSetupPanel = ({player, playerChoices, onPlayerChange, onColorChange}) => {

  const colorMap = {
    BLUE: 'Blue',
    GREEN: 'Green',
    YELLOW: 'Yellow',
    RED: 'Red'
  };

  const getPlayerChoices = () => {
    return playerChoices.map((choice, index) => {
      return <MenuItem key={index} value={choice}>{choice.name}</MenuItem>;
    });
  };

  const getColorChoices = () => {
    return Object.keys(colorMap).map((key) => {
      return <MenuItem key={`color-${key}`} value={key}>{colorMap[key]}</MenuItem>;
    });
  };

  return (
    <Box>
      <Select
        label="User"
        value={player}
        onChange={($e) => {
          onPlayerChange(player, $e.target.value);
        }}
      >
        {getPlayerChoices()}
      </Select>
      <Select
        label="Color"
        value={player.color}
        onChange={($e) => {
          onColorChange(player, $e.target.value);
        }}
      >
        {getColorChoices()}
      </Select>
    </Box>
  );
};

export default PlayerSetupPanel;