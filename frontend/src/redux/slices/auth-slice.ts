import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";
import { RootState } from "../store";

type AuthState = {
  user: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
} as AuthState;

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.protected.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.username;
        state.isAuthenticated = payload.success;
      }
    );
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
