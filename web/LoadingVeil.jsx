import {useContext} from 'react';
import {LoadingContext} from './LoadingContext';

import Loading from './images/loading.gif';

import {default as W} from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {row, center} from './theme';

const veil = {
  position: 'absolute',
  top: '0px',
  bottom: '0px',
  left: '0px',
  right: '0px',
  width: '100%',
  height: '100%',
  bgcolor: 'rgba(255,255,255,0.6)',
  zIndex: '99',
  textAlign: 'center'
};

const LoadingVeil = () => {

  const {isLoading} = useContext(LoadingContext);

  return isLoading ?
    <Box sx={veil} id="veil">
      <Paper sx={{...row, ...center, justifyContent: 'center', width: '200px', margin: 'auto', bgcolor: 'white', marginTop: '24px'}}>
        <img src={Loading} width="48" height="48"/>
        <W>Loading...</W>
      </Paper>
    </Box>
    :
    null;
};

export default LoadingVeil;