import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "../../lib/models/UserDetails";
import type { RootState } from "../store";

// Define a type for the slice state
interface userState {
  userName: string;
  token: string | null;
  Authenticated: boolean
}

// Define the initial state using that type
const initialState: userState = {
  userName: "",
  token: window.localStorage.getItem("token"),
  Authenticated: window.localStorage.getItem("token") != null ? true : false
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserDetails>) => {
      state.token = action.payload.token;
      state.Authenticated = true;
      state.userName = action.payload.email;
      window.localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.Authenticated = false;
      state.token = null;
      window.localStorage.removeItem("token");
      state.userName = ""
    },
    update: (state, action: PayloadAction<UserDetails>) => {

    }
  },
});

export const { loginUser, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUserName = (state: RootState) => state.user.userName;

export const getToken = (state: RootState) => state.user.token;

export const getAuthStatus = (state: RootState) => state.user.token;

export default userSlice.reducer;
