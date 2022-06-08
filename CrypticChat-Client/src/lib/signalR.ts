import { HubConnectionBuilder } from "@microsoft/signalr";
import { addChatMessage } from "../redux/slices/chatSlice";
import { store } from "../redux/store";

const {user} = store.getState();

const chatConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5286/hubs/chat", {accessTokenFactory: () => user.token!, withCredentials: false})
    .build();    

chatConnection.on("recieveMessage", (user,message) => {
    store.dispatch(addChatMessage({friend: user, message}))
});
chatConnection.start()
export default chatConnection;

