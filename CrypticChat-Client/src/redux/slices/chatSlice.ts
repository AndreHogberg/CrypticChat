import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatMessages, UserMessage } from "../../lib/models/Message";

interface chatState {
    chatMessage: ChatMessages[]
}

const initialState: chatState = {
    chatMessage: []
}


export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers:{
        addChatMessage: (state, action: PayloadAction<UserMessage>) => {
            const emptyMessageList = state.chatMessage.length === 0;
            if(emptyMessageList){
                const messageList = [action.payload.message];
                state.chatMessage.push({friend: action.payload.friend,messages: messageList})
            }else{
                const userExistsInList = state.chatMessage.find(x => x.friend === action.payload.friend);
                if(userExistsInList){
                    state.chatMessage.map(x => {
                        if(x.friend === action.payload.friend){
                            x.messages.push(action.payload.message);
                        }
                        return x;
                    });
                }
                else{
                    const messageList = [action.payload.message];
                    state.chatMessage.push({friend: action.payload.friend, messages:messageList})
                }
            }
        }
    }
});

export const { addChatMessage } = chatSlice.actions;

export default chatSlice.reducer;