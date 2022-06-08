import { HubConnectionBuilder } from "@microsoft/signalr";
import { addChatMessage } from "../redux/slices/chatSlice";
import { store } from "../redux/store";

const {user} = store.getState();

const chatConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5286/hubs/chat", {accessTokenFactory: () => user.token!, withCredentials: false})
    .build();    

chatConnection.on("recieveMessage", (senderUser,message,date) => {
    console.log("Test");
    
    store.dispatch(addChatMessage({userName: senderUser, message, date }))
});
chatConnection.start()
export default chatConnection;

