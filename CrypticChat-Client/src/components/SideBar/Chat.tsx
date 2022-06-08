import Incoming from "../Chat/Incoming";
import Outgoing from "../Chat/Outgoing";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import chatConnection from "../../lib/signalR";
import { useAppSelector } from "../../redux/hooks";
import { UserMessage } from "../../lib/models/Message";
import { useParams } from "react-router-dom";
import ChatBox from "../Chat/ChatBox";

export default function Chat() {
  const param = useParams<{ id: string }>();
  return <ChatBox friendId={param.id!} />;
}
