import { createSlice } from '@reduxjs/toolkit';

const postModalPlayerInitialState = {
  isSelected: false,
  name: '',
  year: '',
  season: '',
};
const modalInitialState = {
  isOpen: false,
  top: postModalPlayerInitialState,
  jungle: postModalPlayerInitialState,
  mid: postModalPlayerInitialState,
  bot: postModalPlayerInitialState,
  support: postModalPlayerInitialState,
};
export const postModal = createSlice({
  name: 'postModal',
  initialState: modalInitialState,
  reducers: {
    reset: (state, action) => {
      return { ...state, ...modalInitialState };
    },
    setIsOpen: (state, action) => {
      const { payload } = action;
      return { ...state, isOpen: payload };
    },
    playerSelect: (state, action) => {
      const {
        payload: { line, playerInfo, isSelected },
      } = action;
      return { ...state, [line.toLowerCase()]: { ...playerInfo, isSelected: isSelected } };
    },
  },
});
