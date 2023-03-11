import { configureStore } from '@reduxjs/toolkit';
import { chart } from './chartStore';
import { postModal } from './modalStore';
import { navBarSlice } from './navBarStore';
import { players, playersSlice } from './playerStore';

export const store = configureStore({
  reducer: {
    navBarSlice: navBarSlice.reducer,
    playersSlice: playersSlice.reducer,
    players: players.reducer,
    chart: chart.reducer,
    postModal: postModal.reducer,
  },
});

export const navBarActions = navBarSlice.actions;
export const playersActions = players.actions;
export const chartActions = chart.actions;
export const postModalActions = postModal.actions;

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

export interface IPostModalPlayerInitialState {
  isSelected: boolean;
  name: string;
  year: string;
  season: string;
}

export interface IRootState {
  navBarSlice: { isSelect: boolean };
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
  postModal: {
    [key: string]: any;
    isOpen: boolean;
    top: IPostModalPlayerInitialState;
    jungle: IPostModalPlayerInitialState;
    mid: IPostModalPlayerInitialState;
    bot: IPostModalPlayerInitialState;
    support: IPostModalPlayerInitialState;
  };
}
