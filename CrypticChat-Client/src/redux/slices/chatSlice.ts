import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatMessages, UserMessage } from "../../lib/models/Message";

interface chatState {
    chatMessage: UserMessage[]
}

const initialState: chatState = {
    chatMessage: []
}


export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers:{
        addChatMessage: (state, action: PayloadAction<UserMessage>) => {
            const date = action.payload.date!.toString();
            state.chatMessage.push({userName: action.payload.userName, message: action.payload.message, date: new Date(date)});

        } 
    }
});

export const { addChatMessage } = chatSlice.actions;

export default chatSlice.reducer;