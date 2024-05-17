import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    token: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logInStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        logInSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
        },
        logInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.token = null
            state.loading = false;
            state.error = false;
        }
    },
});

export const {
    logInStart,
    logInSuccess,
    logInFailure,
    signOut,
} = userSlice.actions;

export default userSlice.reducer;