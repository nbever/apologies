import Board from '../images/board.jpg';
import isNil from 'lodash/isNil';

export const FULL = 'FULL';
export const NW = 'NW';
export const NE = 'NE';
export const SW = 'SW';
export const SE = 'SE';

export const UP = 0;
export const DOWN = 1;
export const LEFT = 2;
export const RIGHT = 3;

const ID = 1;
const COS_90 = Math.cos(90 * Math.PI/180.0);
const SIN_90 = Math.sin(90 * Math.PI/180.0);
const COS_45 = Math.cos(45 * Math.PI/180.0);
const SIN_45 = Math.sin(45 * Math.PI/180.0);

let oldMouseMove = null;
let oldMouseClick = null;

const drawArrow = (ctxt, canvas, transform, x, y, action) => {
  const button = new Path2D('M0 3 L10 3 L10 0 L15 5.5 L10 11 L10 8 L0 8 Z');
  const circle = new Path2D('M7.5 5.5 m -10 0 a 10,10 0 1,0 20, 0 a 10, 10 0 1,0 -20, 0')

  ctxt.setTransform(...transform);

  ctxt.strokeStyle = 'white';
  ctxt.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctxt.fill(circle);
  ctxt.fillStyle = 'white';

  if (ctxt.isPointInPath(circle, x, y)) {
    canvas.style.cursor = 'pointer';
    ctxt.fill(button);
  }
  else if (canvas.style.cursor !== 'pointer') {
    canvas.style.cursor = 'default';
  }

  ctxt.stroke(button);

  ctxt.resetTransform();

  return {shape: circle, transform, action};
};

const mouseMoved = (dc) => {
  return ($e) => {
    draw(dc, $e.offsetX, $e.offsetY);
  };
};

const mouseClicked = (dc, shapes) => {
  return ($e) => {

    const {ctxt, clickCallback} = dc;

    const shape = shapes.find((shape) => {
      ctxt.resetTransform();
      ctxt.setTransform(...shape.transform);

      return ctxt.isPointInPath(shape.shape, $e.offsetX, $e.offsetY);
    });

    if (!isNil(shape)) {
      clickCallback({action: shape.action});
    }
  };
};

const draw = (dc, x = 0, y = 0) => {
  const {
    canvas, gameState, viewport, ctxt
  } = dc;

  const buttons = [];

  canvas.style.cursor = 'default';
  ctxt.clearRect(0, 0, canvas.width, canvas.height);
  ctxt.lineWidth = 1;
  ctxt.fillStyle = 'black';

  if (viewport === SE || viewport === SW) {
    buttons.push(drawArrow(ctxt, canvas, [-3*COS_90, -3*SIN_90, 3*SIN_90, 3*COS_90, canvas.width / 2 - 5, 65], x, y, UP));
  }

  if (viewport === NE || viewport === NW) {
    buttons.push(drawArrow(ctxt, canvas, [3*COS_90, 3*SIN_90, -3*SIN_90, -3*COS_90, canvas.width / 2 + 5, canvas.height - 65], x, y, DOWN)); 
  }

  if (viewport === NE || viewport === SE) {
    buttons.push(drawArrow(ctxt, canvas, [-3, 0, 0, 3, 65, canvas.height / 2], x, y, LEFT)); 
  }
  
  if (viewport === NW || viewport === SW) {
    buttons.push(drawArrow(ctxt, canvas, [3, 0, 0, 3, canvas.width - 65, canvas.height / 2], x, y, RIGHT)); 
  }  

  ctxt.resetTransform();

  return {interactiveShapes: buttons};
};

export const init = (canvas, gameState, viewport, clickCallback) => {

  const ctxt = canvas.getContext('2d');
  ctxt.clearRect(0, 0, canvas.width, canvas.height);
  const dc = {canvas, gameState, viewport, ctxt, clickCallback};
  const {interactiveShapes} = draw(dc);

  canvas.removeEventListener('mousemove', oldMouseMove);
  canvas.removeEventListener('mouseup', oldMouseClick);

  oldMouseMove = mouseMoved(dc);
  oldMouseClick = mouseClicked(dc, interactiveShapes);

  canvas.addEventListener('mousemove', oldMouseMove);
  canvas.addEventListener('mouseup', oldMouseClick);
};

export const drawBoard = (canvas, viewport) => {
  const ctxt = canvas.getContext('2d');
  ctxt.clearRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  
  img.onload = () => {
    const imageX = viewport === NW || viewport === SW ? 0 : 750;
    const imageY = viewport === NW || viewport === NE ? 0 : 750;
    const imageWidth = 750;
    const imageHeight = 750;

    ctxt.drawImage(img, imageX, imageY, imageWidth, imageHeight, 0, 0, canvas.width, canvas.height);
  };

  img.src = Board;
};