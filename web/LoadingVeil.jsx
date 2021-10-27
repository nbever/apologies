import {useContext} from 'react';
import {LoadingContext} from './LoadingContext';

const veil = {
  position: 'absolute',
  top: '0px',
  bottom: '0px',
  left: '0px',
  right: '0px',
  width: '100%',
  height: '100%',
  bgcolor: 'white',
  opacity: '0.4'
};

const LoadingVeil = () => {

  const {isLoading} = useContext(LoadingContext);

  return isLoading ?
    <div sx={veil} />
    :
    null;
};

export default LoadingVeil;