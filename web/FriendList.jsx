import {useContext, useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import isNil from 'lodash/isNil';

import {AuthContext} from './AuthContext';
import {GameContext} from './game/GameContext';
import {LoadingContext} from './LoadingContext';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddReaction from '@mui/icons-material/AddReaction';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid'

import {row, pagePadding} from './theme';
import {textFieldChanged} from './utils/formUtils';

let pointer = 0;

const FriendList = () => {

  const history = useHistory();
  const {findUsers, addFriends, getMyFriends, removeFriend} = useContext(GameContext);
  const {user} = useContext(AuthContext);
  const {setLoading} = useContext(LoadingContext);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [friendsSelected, setFriendsSelected] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (isNil(searchValue) || searchValue.length === 0) {
      return;
    }

    doSearch();
  }, [searchValue]);

  useEffect(() => {
    loadFriendList();
  }, []);

  const loadFriendList = async () => {
    setLoading(true);
    const friends = await getMyFriends();
    setFriends(friends);
    setLoading(false);
  };

  const findFriend = () => {
    setSearching(true);
  };

  const closeDialog = () => {
    setSearching(false);
  };

  const doAddFriends = async () => {
    setLoading(true);
    await addFriends(friendsSelected);
    loadFriendList();
    closeDialog();
    setLoading(false);
  };

  const doRemoveFriend = async (friend) => {
    setLoading(true);
    await removeFriend(friend.user_id);
    loadFriendList();
    setLoading(false);
  };

  const doSearch = () => {
    clearTimeout(pointer);
    pointer = setTimeout( async () => {
      const results = await findUsers(searchValue);
      setSuggestions(results.rows);
    }, 400);
  };

  const selectionChanged = (selections) => {
    setFriendsSelected(selections);
  };

  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200
    }
  ];

  const buildListItems = () => {
    return friends.map((friend, index) => {
      return (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton 
              edge="end" 
              onClick={() => {
                doRemoveFriend(friend);
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={friend.username}
            secondary={friend.email}
          />
        </ListItem>
      );
    });
  };

  return (
    <Box sx={{...pagePadding, textAlign: 'left'}}>
      <Dialog open={searching} onClose={closeDialog} fullWidth={true}>
        <DialogTitle>Find a Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search for a friend to add to your list of buddies
          </DialogContentText>
          <TextField
            autoFocus
            id="txt_search"
            placeholder="Search"
            fullWidth
            variant="outlined"
            value={searchValue}
            onChange={textFieldChanged(setSearchValue)}
            margin="dense"
          />
          <Box sx={{height: '400px'}}>
          <DataGrid
            getRowId={(row) => row.user_id}
            columns={columns}
            rows={suggestions}
            checkboxSelection
            onSelectionModelChange={selectionChanged}
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={doAddFriends}>Add Friends</Button>
        </DialogActions>
      </Dialog>

      <Link to="/app/dashboard">Back to Dashboard</Link>
      <Box sx={pagePadding}>
        <Button variant="contained" startIcon={<AddReaction />} onClick={findFriend}>
          Add Friend
        </Button>
      </Box>
      <Box>
        <List 
          dense={true}
        >
          {buildListItems()}
        </List>
      </Box>
    </Box>
  );
};

export default FriendList;