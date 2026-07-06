import { createSlice } from "@reduxjs/toolkit";

const getCurrentUserFromLocalStorage = () => {
  const data = localStorage.getItem("currentUser");

  if (!data || data === "undefined") {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (err) {
    localStorage.removeItem("currentUser");
    return null;
  }
};
const initialState = {
  currentUser: getCurrentUserFromLocalStorage(),
  isLoggedIn: getCurrentUserFromLocalStorage() ? true : false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    signupSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.isLoggedIn = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentUser", JSON.stringify(action.payload.user));

      state.success = "Login Successful";
      state.error = null;
    },

    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;

      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.error = null;
      state.success = null;

      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  signupSuccess,
  loginSuccess,
  updateCurrentUser,
  logout,
  setError,
  clearMessages,
} = userSlice.actions;

export default userSlice.reducer;
