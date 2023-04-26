import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  info: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.info = action.payload.info;
      state.token = action.payload.token;
    },
    setFavorite(state, action) {
      state.info.favorites.ids.push(action.payload.id);
      state.info.favorites.lots.push(action.payload.lot);
    },
    removeFavorite(state, action) {
      state.info.favorites.ids = state.info.favorites.ids.filter(
        (x) => x != action.payload.id
      );
      state.info.favorites.lots = state.info.favorites.lots.filter(
        (x) => x.id != action.payload.lot.id
      );
    },
    addLot(state, action) {
      state.info.lots.push(action.payload);
    },
    addModerationLot(state, action) {
      state.info.lots.moderation.push(action.payload);
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

export const {
  setAuthState,
  setFavorite,
  removeFavorite,
  addLot,
  addModerationLot,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuthState = (state) => state.auth;
export const selectFavoritesState = (state) => state.auth.info.favorites;
