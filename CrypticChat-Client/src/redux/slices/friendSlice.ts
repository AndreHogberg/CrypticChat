import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friend } from "../../lib/models/Friend";

interface friendState {
    friends: friend[]
}

const initialState: friendState = {
    friends: []
}


export const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        bulkAdd: (state, action: PayloadAction<friend[]>) => {
            state.friends = action.payload;
        },
        addFriend: (state, action: PayloadAction<friend>) => {
            state.friends.push(action.payload);
        }
    }
});

export const {bulkAdd, addFriend} = friendSlice.actions;

export default friendSlice.reducer;