import Box from '@mui/material/Box';

import Pawn from './images/pawn.png';
import Logo from './images/sorry-logo.png';
import {row, theme, stiff, center} from './theme';

const imageStyle = {
  width: '48px',
  height: '48px',
  backgroundImage: `url('${Pawn}')`,
  backgroundSize: 'contain',
  paddingRight: '8px',
  backgroundRepeat: 'no-repeat'
};

const imageStyle2 = {
  width: '128px',
  height: '48px',
  backgroundImage: `url('${Logo}')`,
  backgroundSize: 'contain',
  paddingRight: '8px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
};

const Banner = () => {

  return (
    <Box sx={{...row, ...stiff, ...center, backgroundColor: theme.palette.primary.main, padding: '12px'}}>
      <Box sx={imageStyle} />
      <Box sx={imageStyle2}/>
    </Box>
  );
};

export default Banner;