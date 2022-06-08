import { HubConnectionBuilder } from "@microsoft/signalr";
import { emitMessage } from "../redux/slices/chatSlice";
import { store } from "../redux/store";
import { UserMessage } from "./models/Message";

const {user} = store.getState();

const chatConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5286/hubs/chat", {accessTokenFactory: () => user.token!, withCredentials: false})
    .build(); 
    
    
chatConnection.on("recieveMessage", (message: UserMessage) => {
    store.dispatch(emitMessage(message))
})
chatConnection.start()
export default chatConnection;

