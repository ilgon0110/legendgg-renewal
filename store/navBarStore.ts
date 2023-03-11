import { createSlice } from '@reduxjs/toolkit';

export const navBarSlice = createSlice({
  name: 'navBar',
  initialState: {
    isSelect: true,
  },
  reducers: {
    isClick: (state) => {
      return { ...state, isSelect: Boolean(!state.isSelect) };
    },
  },
});
