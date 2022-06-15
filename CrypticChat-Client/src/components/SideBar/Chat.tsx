import { useParams, useSearchParams } from "react-router-dom";
import chatConnection from "../../lib/signalR";
import ChatBox from "../Chat/ChatBox";

export default function Chat() {
  const param = useParams<{ id: string }>();
  chatConnection.invoke("ConnectToRoom", param.id);

  return <ChatBox friendId={param.id!} />;
}
