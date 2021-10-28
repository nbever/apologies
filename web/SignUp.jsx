import {useState, useContext} from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  Link,
  useHistory
} from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {AuthContext} from './AuthContext';

import GameBox from './images/gamebox.png';
import {buffer} from './theme';
import {textFieldChanged} from './utils/formUtils';

const SignUp = () => {

  const history = useHistory();
  const {createAccount} = useContext(AuthContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');

  const doCreateAccount = async () => {
    try {
      await createAccount(username, password, email);
    }
    catch (e) {
      console.log(`Error: ${e}`);
      return;
    }

    history.push('/login', {username});
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
        sx={formStyle}
      >
        <Box>
          <img src={GameBox} height="128" width="128"/>
        </Box>
        <Box sx={buffer}><TextField id="txt_username" label="Username" value={username} onChange={textFieldChanged(setUsername)} fullWidth/></Box>
        <Box sx={buffer}><TextField id="txt_email" label="Email" value={email} onChange={textFieldChanged(setEmail)} type="email" fullWidth/></Box>
        <Box sx={buffer}><TextField id="txt_password" label="Password" type="password" value={password} onChange={textFieldChanged(setPassword)} fullWidth/></Box>
        <Box sx={buffer}>
          <TextField 
            id="txt_confirm_password" 
            label="Confirm Password" 
            type="password" 
            value={passwordConfirm} 
            onChange={textFieldChanged(setPasswordConfirm)}
            error={password !== passwordConfirm}
            helperText={password === passwordConfirm ? '' : 'Passwords must match.'}
            fullWidth
          />
        </Box>
        <Box sx={buffer}><Button type="primary" onClick={doCreateAccount} variant="contained">Create Account</Button></Box>
        <Box sx={buffer}>
          <Link to="/login">Cancel</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;