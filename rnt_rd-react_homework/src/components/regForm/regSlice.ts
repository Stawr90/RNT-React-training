import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useHttp } from "hooks/http.hook";
import { IFormData } from 'types/TypesBase';

interface IStateReg {
    user: {},
    regLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error';
}

const initialState: IStateReg = {
    user: {},
    regLoadingStatus: 'idle'
}

export const fetchRegUser = createAsyncThunk(
    'reg/fetchRegUser',
    async (data: IFormData) => {
        const {request} = useHttp();
        return await request("http://localhost:3000/profile", 'POST', JSON.stringify(data));
    } 
);

export const regSlice = createSlice({
    name: 'reg',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Profile registration
            .addCase(fetchRegUser.pending, state => {state.regLoadingStatus = 'loading'})
            .addCase(fetchRegUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.regLoadingStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchRegUser.rejected, state => {state.regLoadingStatus = 'error'})

            .addDefaultCase(() => {})
    }
})

const {reducer} = regSlice;

export default reducer;