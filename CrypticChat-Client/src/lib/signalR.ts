import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";
import { emitMessage } from "../redux/slices/chatSlice";
import { store } from "../redux/store";
import { UserMessage } from "./models/Message";

const { user } = store.getState();

const chatConnection = new HubConnectionBuilder()
  .withUrl("http://localhost:5286/hubs/chat", {
    accessTokenFactory: () => user.token!,
    withCredentials: false,
  })
  .build();

chatConnection.on("recieveMessage", (message: UserMessage) => {
  store.dispatch(emitMessage(message));
});
chatConnection.start();

const fConnection = new HubConnectionBuilder()
  .withUrl("http://localhost:5286/hubs/friends", {
    accessTokenFactory: () => user.token!,
    withCredentials: false,
  })
  .build();

fConnection.on("recieveFriendRequest", (username: string) => {
  toast.success(`${username} has sent you a friend request!`);
});

fConnection.on("acceptFriend", (username) => {
  toast.success(`${username} has accepted your friend request!`);
});

fConnection.start();
export const friendConnection = fConnection;

export default chatConnection;
