import { createSlice } from '@reduxjs/toolkit';

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

export const chart = createSlice({
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
