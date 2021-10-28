import {useContext, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

import {AuthContext} from './AuthContext';

import FriendDialog from './FriendDialog';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import AddReaction from '@mui/icons-material/AddReaction';

import {row, pagePadding} from './theme';

const FriendList = () => {

  const [searching, setSearching] = useState(false);

  const history = useHistory();
  const {user} = useContext(AuthContext);

  const findFriend = () => {
    setSearching(true);
  };

  const closeDialog = () => {
    setSearching(false);
  };

  return (
    <Box>
      <FriendDialog open={searching} onClose={closeDialog} />
      <Link to="/app/dashboard" />
      <Box sx={pagePadding}>
        <Button variant="contained" startIcon={<AddReaction />} onClick={findFriend}>
          Add Friend
        </Button>
      </Box>
      <Box>
        <List>
        </List>
      </Box>
    </Box>
  );
};

export default FriendList;