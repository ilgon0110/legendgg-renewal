import { configureStore, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { combineReducers } from 'redux';
import { IplayerData } from '../pages/stats/[id]';

interface IplayerSlice {
  years: string[];
  seasons: string[];
  names: string[];
}

interface IChart {
  kda: number;
  kp: number;
  gd10: number;
  dth: number;
  cs10: number;
  gold: number;
  dpm: number;
  winRate: number;
  dmg: number;
}

export interface IRootState {
  playersSlice: IplayerSlice;
  players: {
    isPlayerOneSelect: boolean;
    isPlayerTwoSelect: boolean;
    playerOneName: string;
    playerOneYear: string;
    playerOneSeason: string;
    playerTwoName: string;
    playerTwoYear: string;
    playerTwoSeason: string;
  };
  chart: {
    playerOne: IChart;
    playerTwo: IChart;
  };
}

const playersSlice = createSlice({
  name: 'playerSlice',
  initialState: {
    years: [
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
    ],
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
const initialChart = {
  kda: 0,
  kp: 0,
  gd10: 0,
  dth: 0,
  cs10: 0,
  gold: 0,
  dpm: 0,
  winRate: 0,
  dmg: 0,
};
const chart = createSlice({
  name: 'chart',
  initialState: {
    playerOne: initialChart,
    playerTwo: initialChart,
  },
  reducers: {
    playerOneChart: (state, action) => {
      const { payload } = action;
      return { ...state, playerOne: { ...payload } };
    },
    playerOneReset: (state) => {
      return { ...state, playerOne: { ...initialChart } };
    },
    playerTwoChart: (state, action) => {
      const { payload } = action;
      return { ...state, playerTwo: { ...payload } };
    },
    playerTwoReset: (state) => {
      return { ...state, playerTwo: { ...initialChart } };
    },
  },
});

const players = createSlice({
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
export const store = configureStore({
  reducer: {
    playersSlice: playersSlice.reducer,
    players: players.reducer,
    chart: chart.reducer,
  },
});

export const playersActions = players.actions;
export const chartActions = chart.actions;
