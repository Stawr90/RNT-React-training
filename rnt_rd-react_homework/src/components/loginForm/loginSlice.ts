import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useHttp } from "hooks/http.hook";

interface IFetchLogin {
    username?: string,
    password?: string
}

interface IStateLogin {
    profile: IFetchLogin,
    reg: boolean,
    login: boolean,
    loginLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error';
}

const initialState: IStateLogin = {
    profile: {},
    reg: false,
    login: false,
    loginLoadingStatus: 'idle'
}

export const fetchLoginUser = createAsyncThunk(
    'login/fetchLoginUser',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3000/profile");
    } 
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginOrReg: (state) => {
            state.reg = !state.reg;
        },
        loginGetChar: (state, action) => {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginUser.pending, state => {state.loginLoadingStatus = 'loading'})
            .addCase(fetchLoginUser.fulfilled, (state: IStateLogin, action: PayloadAction<any>) => {
                state.loginLoadingStatus = 'succeeded';
                if (state.profile.username === action.payload.username && state.profile.password === action.payload.password) {
                    state.login = true;

                    localStorage.setItem('isAuthenticated', 'true');
                } else {
                    alert('Error username or password');
                }
            })
            .addCase(fetchLoginUser.rejected, state => {state.loginLoadingStatus = 'error'})

            .addDefaultCase(() => {})
    }
    
})

export const useReg = (state) => state.login.reg;
export const useLog = (state) => state.login.login;
export const profile = (state) => state.login.profile;

const {actions, reducer} = loginSlice;

export default reducer;

export const {loginOrReg, loginGetChar} = actions;