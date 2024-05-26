
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  criteria: ""
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateCriteria: (state, action) => {
      state.criteria = action.payload.criteria;
    },
  }
});

export const { updateCriteria } = profileSlice.actions;
export const profileData = (state) => state.profile;
export default profileSlice.reducer;