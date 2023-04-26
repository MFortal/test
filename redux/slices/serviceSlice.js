import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  service: "",
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceState(state, action) {
      state.service = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setServiceState } = serviceSlice.actions;

export default serviceSlice.reducer;

export const selectServiceState = (state) => state.service;
