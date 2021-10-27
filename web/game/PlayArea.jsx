import {useState, useCallback} from 'react';

import isNil from 'lodash/isNil';
import Box from '@mui/material/Box';
import Measure from 'react-measure';

import {init, drawBoard, FULL, NE, NW, SE, SW, UP, DOWN, LEFT, RIGHT} from './canvasHelpers';

const navMatrix = {
  [`${NW}-${DOWN}`]: SW,
  [`${NW}-${RIGHT}`]: NE,
  [`${NE}-${DOWN}`]: SE,
  [`${NE}-${LEFT}`]: NW,
  [`${SW}-${UP}`]: NW,
  [`${SW}-${RIGHT}`]: SE,
  [`${SE}-${UP}`]: NE,
  [`${SE}-${LEFT}`]: SW 
};

const PlayArea = ({gameState}) => {

  const [dimensions, setDimensions] = useState({height: -1, width: -1});
  const [viewport, setViewport] = useState(SW);

  const canvasRef = useCallback((canvas) => {

    if (isNil(canvas)) {
      return;
    }

    init(canvas, gameState, viewport, clickCallback);

  }, [dimensions, viewport]);

  const backgroundRef = useCallback((canvas) => {

    if (isNil(canvas)) {
      return;
    }

    drawBoard(canvas, viewport);

  }, [dimensions, viewport]);

  const clickCallback = (action) => {
    const newViewport = navMatrix[`${viewport}-${action.action}`];
    setViewport(newViewport);
  };

  return (
    <Measure 
      bounds
      onResize={(contentRect) => {
        setDimensions(contentRect.bounds);
      }}
    >
      {({measureRef}) => {

        const dim = Math.min(dimensions.height, dimensions.width);

        return (
          <div ref={measureRef} style={{position: 'relative', height: '100%', width: '100%', textAlign: 'center'}}>
            <canvas ref={backgroundRef} height={dim} width={dim} style={{position: 'absolute', top: '0', left: '0'}}/>
            <canvas ref={canvasRef} height={dim} width={dim} style={{border: '1px solid red', position: 'absolute', top: '0', left: '0'}} />
          </div>
        );
      }}
    </Measure>
  );
};

export default PlayArea;