import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestDto } from "../../lib/models/Friend";

interface requestState {
  requests: requestDto[];
}
const initialState: requestState = {
  requests: [],
};

export const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    bulkAdd: (state, action: PayloadAction<requestDto[]>) => {
      state.requests = action.payload;
    },
    removeRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter(
        (x) => x.friendId !== action.payload
      );
    },
  },
});

export const { bulkAdd, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
