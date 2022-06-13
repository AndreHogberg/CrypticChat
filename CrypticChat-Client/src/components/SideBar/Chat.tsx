import { useParams, useSearchParams } from "react-router-dom";
import ChatBox from "../Chat/ChatBox";

export default function Chat() {
  const param = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const chatRoom = searchParams.get("chatRoom");

  return <ChatBox friendId={param.id!} chatRoomId={chatRoom!} />;
}
