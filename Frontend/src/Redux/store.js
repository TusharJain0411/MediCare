import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";

import alertReducer from "./slices/alertSlice";

import notificationReducer from "./slices/notificationSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    notification: notificationReducer,
  },
});

export default store;
