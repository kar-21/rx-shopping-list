import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import RootReducer from "./reducer";

const store = configureStore({
  reducer: combineReducers({ reducer: RootReducer }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
