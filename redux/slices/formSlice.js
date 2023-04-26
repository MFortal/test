import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  data: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormState(state, action) {
      state.data = new FormData(action.payload);
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.form,
      };
    },
  },
});

export const { setFormState } = formSlice.actions;

export default formSlice.reducer;

export const selectFormState = (state) => state.form;
