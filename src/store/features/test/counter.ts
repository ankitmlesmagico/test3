import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increase: (state) => {
      state.count += 1;
    },
    decrease: (state) => {
      state.count -= 1;
    },
    incrementBy: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increase, decrease, incrementBy } = counterSlice.actions;
export default counterSlice.reducer;
