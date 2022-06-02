import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "history";
import type { RootState } from "../store";

// Define a type for the slice state
interface userState {
  userName: string;
  token: string | null;
}

// Define the initial state using that type
const initialState: userState = {
  userName: "",
  token: window.localStorage.getItem("token"),
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUserName, setToken } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUserName = (state: RootState) => state.user.userName;

export const getToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
