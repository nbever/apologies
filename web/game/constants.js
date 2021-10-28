export const RED = 'RED';
export const BLUE = 'BLUE';
export const GREEN = 'GREEN';
export const YELLOW = 'YELLOW';

export const START = 'START';
export const SAFE = 'SAFE';
export const HOME = 'HOME';
export const BOARD = 'BOARD';

export const defaultPlayerState = {
  user: {
    name: 'player0'
  },
  color: RED,
  pieces: [
    {
      track: START,
      position: 1
    },
    {
      track: START,
      position: 2
    },
    {
      track: START,
      position: 3
    },
    {
      track: START,
      position: 4
    }
  ]  
};

export const defaultGameState = {
  playerTurn: 0,
  winner: null,
  cards: {
    discard: [],
    deck: []
  },
  players: [
  ]
};