
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  criteria: ""
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      updateCriteria: (state, action) => {
       state.criteria = action.payload;
      },
    }
    
});

export const { updateCriteria } = searchSlice.actions;
export const searchData = (state) => state.search;
export default searchSlice.reducer;