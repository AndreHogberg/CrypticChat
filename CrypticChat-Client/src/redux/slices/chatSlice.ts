import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserMessage } from "../../lib/models/Message"

interface chatState {
    message: UserMessage | null
}

const initialState: chatState = {
    message: null
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        emitMessage: (state, action: PayloadAction<UserMessage>) => {
            state.message = action.payload;
        }
    }
})

export const {emitMessage} = chatSlice.actions;

export default chatSlice.reducer;