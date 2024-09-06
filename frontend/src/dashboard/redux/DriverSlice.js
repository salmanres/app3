import { createSlice } from '@reduxjs/toolkit';

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    drivername: '',
    drivernumber: '',
  },
  reducers: {
    driverData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { driverData } = driverSlice.actions;
export default driverSlice.reducer;
