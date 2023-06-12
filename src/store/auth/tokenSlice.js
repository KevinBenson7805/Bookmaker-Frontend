import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {storage} from './storage'

const initialState = {
  currentAccessToken: storage.get("aToken"),
  currentRefreshToken: storage.get("rToken"),
  status: "idle",
};

// ------------ Create async thunk actions -------------- //

export const setAccessTokenAsync = createAsyncThunk("tokenlist/setAccessToken", async (tokenKey) => {

    return tokenKey
  });

export const setRefreshTokenAsync = createAsyncThunk("tokenlist/setRefreshToken", async (tokenKey) => {

    return tokenKey
  });
  
export const tokenSlice = createSlice({
  name: "tokenlist",
  initialState,
  reducers: {},
  // ---------------- register api reducers ---------------- //
  extraReducers: (builder) => {
    builder
      
      .addCase(setAccessTokenAsync.fulfilled, (state, action) => {
        if(action.payload!==""){
            state.currentAccessToken = action.payload

            localStorage.setItem("aToken",action.payload)
        }
      })
      .addCase(setRefreshTokenAsync.fulfilled, (state, action) => {
        if(action.payload!==""){
            state.currentRefreshToken = action.payload
            localStorage.setItem("rToken",action.payload)
        }
      })
      
  },
});

// Action creators are generated for each case reducer function
export const { create, update, remove } = tokenSlice.actions;
export const selectAccessToken = (state) => state.token.currentAccessToken;
export const selectRefreshToken = (state) => state.token.currentRefreshToken;

export default tokenSlice.reducer;
