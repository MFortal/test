import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterSlice from "./slices/counterSlice";
import formSlice from "./slices/formSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  counter: counterSlice,
  form: formSlice,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth", "counter", "form"],
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);

// import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
// import counterSlice from "./slices/counterSlice";

// export function makeStore() {
//   return configureStore({
//     reducer: { counter: counterSlice },
//   });
// }

// export const store = makeStore();

// export const wrapper = createWrapper(makeStore, { debug: true });
