import {useContext, useState} from 'react';

import {AuthContext} from './AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import GameBox from './images/gamebox.png';

const buffer = {
  paddingTop: '4px',
  paddingBottom: '4px'
};

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const {login} = useContext(AuthContext);

  const loginClicked = async () => {
    const result = await login(username, password);

    if (isNil(result)) {
      setError(true);
    }
  };

  const setter = (func) => {
    return ($e) => {
      func($e.target.value);
    };
  };

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
          <img src={GameBox} height="48" width="48"/>
        </Box>
        <Box sx={buffer}><TextField id="txt_username" label="Username" value={username} onChange={setter(setUsername)}/></Box>
        <Box sx={buffer}><TextField id="txt_password" label="Password" type="password" value={password} onChange={setter(setPassword)}/></Box>
        <Box sx={buffer}><Button type="primary" onClick={loginClicked} variant="contained">Login</Button></Box>
        <Box sx={buffer}>
          <Link to="/createAccount">Sign Up</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;