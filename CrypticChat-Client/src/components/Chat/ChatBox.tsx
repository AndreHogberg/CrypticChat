import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useEffect, useMemo, KeyboardEvent } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import agent from "../../lib/agent";
import { ChatMessages, UserMessage } from "../../lib/models/Message";
import chatConnection from "../../lib/signalR";
import { useAppSelector } from "../../redux/hooks";
import Incoming from "./Incoming";
import Outgoing from "./Outgoing";

interface Props {
  friendId: string;
}

export default function ChatBox({ friendId }: Props) {
  const [inputText, setInputText] = useState("");
  const { user, chat } = useAppSelector((state) => state);
  const [messages, setMessage] = useState<UserMessage[]>([]);

  useMemo(() => {
    setMessage((state) => {
      if (chat.message) {
        state.push(chat.message);
      }
      return state;
    });
  }, [chat]);

  useEffect(() => {
    setMessage([]);
    agent.Messages.newChat(friendId).then((mes) => {
      setMessage(mes.messages);
    });
  }, [friendId]);

  const click = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      chatConnection.invoke("NewMessage", inputText, friendId);
      setInputText("");
    }
  };
  return (
    <div className="flex flex-col w-full h-full px-2 py-2 bg-gradient-to-b justify-between space-y-5 from-white to-gray-90">
      <div className="flex flex-col w-full h-full overflow-auto">
        {messages &&
          messages.map((um) =>
            um.sender === user.userName ? (
              <Outgoing
                Text={um.message}
                Name={um.sender}
                Date={new Date(um.date)}
              />
            ) : (
              <Incoming
                Text={um.message}
                Name={um.sender}
                Date={new Date(um.date)}
              />
            )
          )}
      </div>
      <div className="flex flex-roww-full justify-end items-center">
        <input
          value={inputText}
          placeholder="Send Oscar a message"
          className="p-1 border-black w-full"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => click(e)}
        />
      </div>
    </div>
  );
}
