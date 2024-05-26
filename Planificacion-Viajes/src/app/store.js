
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

import storage from "redux-persist/lib/storage";
import { searchSlice } from "./slices/searchSlice";
import profileReducer from "./slices/profileSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  search: searchSlice.reducer,
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
export default store;