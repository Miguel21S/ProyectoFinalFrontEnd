
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";

import storage from "redux-persist/lib/storage";


import userSlice from "./slices/userSlice";
import searchSlice from "./slices/searchSlice";

const reducers = combineReducers({
    usuario: userSlice,
    search: searchSlice,
});

const persistConfig = {
    key: "root",
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk),
  });