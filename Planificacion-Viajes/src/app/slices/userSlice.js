
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credentials: {
    token: null,
    usuario: {
      name: null,
      usuarioRole: null,
    }
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.credentials = action.payload.credentials;
    },
    logout: (state) => {
      state.credentials = {
        token: null,
        usuario: {
          name: null,
          usuarioRole: null,
        }
      };
    }
  }
});

export const { login, logout} = userSlice.actions;
export const userData = (state) => state.user;
export default userSlice.reducer;