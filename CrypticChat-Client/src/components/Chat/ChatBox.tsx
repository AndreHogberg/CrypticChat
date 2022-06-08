import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { UserMessage } from "../../lib/models/Message";
import { useAppSelector } from "../../redux/hooks";
import Incoming from "./Incoming";
import Outgoing from "./Outgoing";

interface Props {
    friendId: string
}

export default function ChatBox({friendId}: Props){
    const [inputText, setInputText] = useState("");
    const {user} = useAppSelector((state) => state);
    const chatConnection = new HubConnectionBuilder()
    .withUrl("/hubs/chat", {accessTokenFactory: () => user.token!, withCredentials: false})
    .build();
    
    const click = () => {
        
    }
    return (
        <div className="flex flex-col w-full h-full px-2 py-2 bg-gradient-to-b justify-between space-y-5 from-white to-gray-90">
        <div className="flex flex-col w-full h-full overflow-auto">
          
        </div>
        <div className="flex flex-roww-full justify-end items-center">
          <input value={inputText} placeholder="Send Oscar a message" className="p-1 border-black w-full" onChange={(e) => setInputText(e.target.value)}></input>
          <button className="bg-purple-600 hover:bg-purple-700 px-2 flex-none py-2 m-2 border-black rounded text-white" onClick={click}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </div>
    )
}