import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from "../../services/authToken";
import serverApi from "../../services/serverAPI";
import { LogInEmailPassword } from "./model";

export interface AuthState {
  status: "loading" | "idle" | "success";
  token: string | null;
  isLoggedIn: boolean;
}

const authToken = getAuthToken();

const initialState: AuthState = {
  status: "idle",
  ...authToken,
};

export const checkAuth = createAsyncThunk(
  "logIn/getToken",
  async (EmailPwd: LogInEmailPassword) => {
    const response = await serverApi.logIn(EmailPwd);
    console.log(response);
    return response;
  }
);

export const logInSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      removeAuthToken();
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const response = action.payload;
        if (!response || !response.token) {
          return;
        }

        state.isLoggedIn = response.isLoggedIn;
        state.token = response.token;
        setAuthToken(response.token);
        state.status = "idle";
      });
  },
});

export const { logOut } = logInSlice.actions;
export const LogInCheckAuth =
  (EmailPwd: LogInEmailPassword): AppThunk =>
  (dispatch) => {
    dispatch(checkAuth(EmailPwd));
  };

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectLogInStatus = (state: RootState) =>
  state.auth.status === "loading";

export default logInSlice.reducer;
