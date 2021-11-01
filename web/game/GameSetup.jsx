import {useContext, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import isNil from 'lodash/isNil';
import clone from 'lodash/clone';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import {textFieldChanged} from '../utils/formUtils';
import {AuthContext} from '../AuthContext';
import {GameContext} from './GameContext';
import {LoadingContext} from '../LoadingContext';

import {RED, BLUE, YELLOW, GREEN, defaultPlayerState, defaultGameState} from './constants';

import PlayerSetupPanel from './PlayerSetupPanel';
import {buffer, pagePadding} from '../theme';

const GameSetup = () => {

  const history = useHistory();
  const {user} = useContext(AuthContext);
  const {setLoading} = useContext(LoadingContext);
  const {getMyFriends, createNewGame} = useContext(GameContext);
  const [numberPlayers, setNumberOfPlayers] = useState(1);
  const [players, setPlayers] = useState([{user, color: BLUE}]);
  const colors = [BLUE, RED, GREEN, YELLOW];
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const doIt = async () => {
      setLoading(true);
      const friends = await getMyFriends();
      setFriends(friends);
      setLoading(false);
    };

    doIt();
  }, []);

  useEffect(() => {
    setNumberOfPlayers(friends.length > 2 ? 4 : friends.length + 1);
  }, [friends]);

  useEffect(() => {

    if (friends.length === 0 || players.length === numberPlayers) {
      return;
    }

    if (numberPlayers < players.length) {
      setPlayers(players.slice(1, numberPlayers + 1));
    }
    else {
      const toCreate = numberPlayers - players.length;
      const newPlayers = [];

      for (let i = 0; i < toCreate; i++ ) {
        const newPlayer = clone(defaultPlayerState);

        const concatList = players.concat(newPlayers);
        const newColor = getNextFreeColor(concatList);
        const nextFriend = getNextFreeFriend(concatList);

        newPlayer.user = nextFriend;
        newPlayer.color = newColor;
        newPlayers.push(newPlayer);
      }

      setPlayers(players.concat(newPlayers));
    }
  }, [numberPlayers, friends]);

  const getNextFreeColor = (playerList = players) => {
    const newColor = colors.find((color) => {
      return isNil(playerList.find((player) => {
        return player.color === color;
      }));
    });

    return newColor;
  };

  const getNextFreeFriend = (playerList = players) => {

    const newPlayer = friends.find((friend) => {
      const used = playerList.find((player) => {
        return player.user.username === friend.username;
      });

      return isNil(used);
    });

    return newPlayer;
  };

  const getPlayerSetupPanels = () => {

    return players.map((player, index) => {
      return (
        <Box sx={buffer} key={`player-setup-panel-${index}`}>
          <PlayerSetupPanel 
            disableUser={index === 0}
            player={player} 
            onColorChange={colorChange}
            onPlayerChange={playerChange}
            playerChoices={index === 0 ? [user].concat(friends) : friends}
            playerIndex={index + 1}
          />
        </Box>
      );
    });
  };

  const colorChange = (player, newColor) => {

    player.color = newColor;

    players.filter((p1) => {
      return p1.color === newColor && p1 !== player;
    }).forEach((p2) => {
      p2.color = getNextFreeColor(players);
    });

    setPlayers(clone(players));
  };

  const playerChange = (player, newUser) => {
    const fullUser = friends.find((friend) => friend.username === newUser);
    player.user = fullUser;

    players.filter((p1) => {
      return p1.user.username === newUser && p1 !== player;
    }).forEach((p2) => {
      p2.user = getNextFreeFriend(players);
    });

    setPlayers(clone(players));
  };

  const startGame = async () => {
    setLoading(true);
    const gameId = await createNewGame(players);
    history.push(`/app/game/${gameId}`);
    setLoading(false);
  };

  return (
    <Box sx={{...pagePadding, paddingTop: '12px', textAlign: 'left'}}>
      <Box sx={{...buffer, paddingBottom: '24px'}}>
        <Link to="/app/dashboard">Back to Dashboard</Link>
      </Box>
      <Box sx={{buffer}}>
        <TextField 
          id="num_players"
          sx={{width: '150px'}}
          size="small"
          label="Number of Players"
          type="number"
          inputProps={{
            min: 2,
            max: friends.length > 3 ? 4 : friends.length
          }}
          value={numberPlayers}
          onChange={textFieldChanged(setNumberOfPlayers)}
        />
      </Box>
      {getPlayerSetupPanels()}
      <Box sx={buffer}>
        <Button variant="contained" onClick={startGame}>Start Game!</Button>
      </Box>
    </Box>
  );
};

export default GameSetup;