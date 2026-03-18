import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 token: null,
};

export const tokenSlice = createSlice({
    name: 'token',

    initialState,
    reducers: {
        login: (state, action) => { state.token = action.payload },
        logout: (state) => { state.token = null },
    },
 },
);

export const { login, logout } = tokenSlice.actions;
export default tokenSlice.reducer;