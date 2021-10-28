import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import isNil from 'lodash/isNil';

import {AuthContext} from './AuthContext';

import Box from '@mui/material/Box';
import {default as Words} from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';

import {bigTopBuffer, row} from './theme';

const Dashboard = () => {

  const history = useHistory();
  const {user} = useContext(AuthContext);

  if (isNil(user)) {
    history.push('/login');
    return null;
  }

  const newGame = () => {
    history.push('/app/newGame');
  };

  const addFriend = () => {
    history.push('/app/friendList');
  };

  return (
    <Box>
      <Box>
        <Words type="title">Welcome {user.username}!</Words> 
      </Box>
      <Box sx={{...row, justifyContent: 'space-around'}}>
        <Button variant="contained" startIcon={<AddLocationTwoToneIcon />} onClick={newGame}>
          Start a New Game
        </Button>
        <Button variant="contained" startIcon={<EmojiEmotions />} onClick={addFriend}>
          Manage Friend List
        </Button>
      </Box>
      <Box sx={bigTopBuffer}>
        <Words type="h2">Games In Progess</Words>
        {/* list goes here */}
      </Box>
    </Box>
  );
};

export default Dashboard;