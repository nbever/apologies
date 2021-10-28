import {useState, useEffect, useContext} from 'react';

import isNil from 'lodash/isNil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import {GameContext} from './game/GameContext';

import {textFieldChanged} from './utils/formUtils';
import {pagePadding} from './theme';

let pointer = 0;

const FriendDialog = ({open, onClose}) => {

  const {findUsers} = useContext(GameContext);
  const [searchValue, setSearchValue] = useState('');

  const doSearch = () => {
    clearTimeout(pointer);
    pointer = setTimeout( async () => {
      const users = await findUsers(searchValue);
    }, 400);
  };

  useEffect(() => {
    if (isNil(searchValue) || searchValue.length === 0) {
      return;
    }

    doSearch();
  }, [searchValue]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Find a Friend</DialogTitle>
      <DialogContent sx={pagePadding}>
        <OutlinedInput
          id="txt_search"
          value={searchValue}
          onChange={textFieldChanged(setSearchValue)}
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          placeholder="Search"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FriendDialog;