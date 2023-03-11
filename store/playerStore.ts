import { createSlice } from '@reduxjs/toolkit';

export const playersSlice = createSlice({
  name: 'playerSlice',
  initialState: {
    years: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    seasons: ['spring', 'summer', 'world'],
    names: [
      'ambition',
      'bang',
      'bdd',
      'bengi',
      'beryL',
      'canyon',
      'chovy',
      'crown',
      'cuvee',
      'deft',
      'faker',
      'flame',
      'fly',
      'gorilla',
      'imp',
      'kakao',
      'khan',
      'kuro',
      'madlife',
      'marin',
      'mata',
      'nuguri',
      'pawn',
      'peanut',
      'pray',
      'rascal',
      'ruler',
      'score',
      'showmaker',
      'shy',
      'smeb',
      'ssumday',
      'tarzan',
      'teddy',
      'viper',
      'wolf',
    ],
  },
  reducers: {
    add: (state, action) => {},
  },
});

export const players = createSlice({
  name: 'players',
  initialState: {
    isPlayerOneSelect: false,
    isPlayerTwoSelect: false,
    playerOneName: '',
    playerOneYear: '',
    playerOneSeason: '',
    playerTwoName: '',
    playerTwoYear: '',
    playerTwoSeason: '',
  },
  reducers: {
    playerOneSelect: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        isPlayerOneSelect: payload.isSelect,
        playerOneName: payload.name,
        playerOneYear: payload.year,
        playerOneSeason: payload.season,
      };
    },
    playerTwoSelect: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        isPlayerTwoSelect: payload.isSelect,
        playerTwoName: payload.name,
        playerTwoYear: payload.year,
        playerTwoSeason: payload.season,
      };
    },
  },
});
