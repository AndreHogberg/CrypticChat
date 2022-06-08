import { HubConnectionBuilder } from "@microsoft/signalr";
import { store } from "../redux/store";

const {user} = store.getState();

const chatConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5286/hubs/chat", {accessTokenFactory: () => user.token!, withCredentials: false})
    .build();    

chatConnection.on("recieveMessage", (senderUser,message,date) => {

});
chatConnection.start()
export default chatConnection;

