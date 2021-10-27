import Box from '@mui/material/Box';

import Pawn from './images/pawn.png';
import {row, theme, stiff, center} from './theme';

const imageStyle = {
  width: '48px',
  height: '48px',
  backgroundImage: `url('${Pawn}')`,
  backgroundSize: 'contain',
  paddingRight: '8px',
  backgroundRepeat: 'no-repeat'
};

const Banner = () => {

  return (
    <Box sx={{...row, ...stiff, ...center, backgroundColor: theme.palette.primary.main, padding: '12px'}}>
      <Box sx={imageStyle} />
      <Box sx={{fontSize: '32px', color: 'white', textTransform: 'uppercase'}}>
        Sorry!
      </Box>
    </Box>
  );
};

export default Banner;