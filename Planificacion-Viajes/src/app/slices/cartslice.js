import { createSlice } from '@reduxjs/toolkit'

export const perfilSlice = createSlice({
    nombre: 'perfil',
    initialState: {
        criterial: ""
    },

    reducers: {
        perfil: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
    }
})

export const { perfil } = perfilSlice.action;
export const perfilData = ( state ) => state.perfil;
export default perfilSlice.reducer;