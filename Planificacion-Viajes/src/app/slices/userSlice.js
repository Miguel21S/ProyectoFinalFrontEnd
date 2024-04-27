
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    nombre: 'usuario',
    initialState: {
        credentials: {}
    },

    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { login, logout} = userSlice.actions;
export const userData = (state) => state.usuario;
export default userSlice.reducer;