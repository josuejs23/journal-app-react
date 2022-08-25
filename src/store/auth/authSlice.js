import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status:'checking',
        email:null,
        displayName:null,
        photoURL:null,
        errorMessage:null
    },
    reducers: {
        login: (state, {payload} ) => {
            state.status='authenticated';
            state.email=payload.email;
            state.uid=payload.uid;
            console.log(payload)
            state.displayName=payload.displayName;
            state.photoURL=payload.photoURL;
            state.errorMessage=null;
        },

        logout: (state, {payload}) => {
            state.status='not-authenticated';
            state.email=null;
            state.displayName=null;
            state.photoURL=null;
            state.errorMessage=payload?.errorMessage;
            console.log({payload})
        },

        checkingCredentials: (state) =>{
            state.status = 'checking'
        }
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;