import { createSlice } from '@reduxjs/toolkit';

const postModalPlayerInitialState = {
  isSelected: false,
  name: '',
  year: '',
  season: '',
};

export const postModal = createSlice({
  name: 'postModal',
  initialState: {
    isOpen: false,
    top: postModalPlayerInitialState,
    jungle: postModalPlayerInitialState,
    mid: postModalPlayerInitialState,
    bot: postModalPlayerInitialState,
    support: postModalPlayerInitialState,
  },
  reducers: {
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
