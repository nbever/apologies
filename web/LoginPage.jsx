import {useContext, useState} from 'react';
import isNil from 'lodash/isNil';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useHistory, Link, useLocation} from 'react-router-dom';

import {AuthContext} from './AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import {textFieldChanged} from './utils/formUtils';

import GameBox from './images/gamebox.png';

import {buffer} from './theme';

const LoginPage = () => {

  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const [username, setUsername] = useState(!isNil(location?.state?.username) ? location.state.username : '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const {login} = useContext(AuthContext);

  const loginClicked = async () => {
    setError(false);
    const result = await login(username, password);

    if (isNil(result)) {
      setError(true);
    }

    history.push('/app/dashboard');
  };

  const signUp = () => {
    history.push('/createAccount');
  };

  const formStyle = {
    textAlign: 'center',
    padding: '24px',
    borderRadius: '12px',
    bgcolor: 'primary.secondary',
    margin: 'auto'
  };

  if (!matches) {
    formStyle.maxWidth = '400px';
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        margin: 'auto',
        overflow: 'auto'
      }}
    >
      <Box 
        sx={{
          textAlign: 'center',
          padding: '24px',
          borderRadius: '12px',
          bgcolor: 'primary.secondary',
          maxWidth: '400px',
          maxHeight: '400px',
          margin: 'auto',
        }}
      >
        <Box>
          <img src={GameBox} height="128" width="128"/>
        </Box>
        <Box sx={buffer}><TextField id="txt_username" label="Username" value={username} onChange={textFieldChanged(setUsername)} fullWidth/></Box>
        <Box sx={buffer}><TextField id="txt_password" label="Password" type="password" value={password} onChange={textFieldChanged(setPassword)} fullWidth/></Box>
        {
          error === true &&
          <Alert severity="error">Login Failed</Alert>
        }
        <Box sx={buffer}><Button type="primary" onClick={loginClicked} variant="contained">Login</Button></Box>
        <Box sx={buffer}>
          <Link to="/createAccount" onClick={signUp}>Sign Up</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;