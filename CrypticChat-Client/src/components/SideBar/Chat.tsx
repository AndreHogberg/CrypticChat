import Incoming from "../Chat/Incoming";
import Outgoing from "../Chat/Outgoing";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import chatConnection from "../../lib/signalR";
import { useAppSelector } from "../../redux/hooks";
import { UserMessage } from "../../lib/models/Message";

export default function Chat() {
  const {chatMessage} = useAppSelector(state => state.chat);
  const [myMessages, setMyMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState(""); 
  const [concatMessages, setConcatMessages] = useState<UserMessage[]>();

  useEffect(() => {
    
  },[chatMessage, myMessages])
  const click = () => {
    chatConnection.invoke("NewMessage","Oscar", "hej :)")
    setMyMessages(myMessages.concat(inputText))
  }
  return (
    <div className="flex flex-col w-full h-full px-2 py-2 bg-gradient-to-b justify-between space-y-5 from-white to-gray-90">
      <div className="flex flex-col w-full h-full overflow-auto">
        {chatMessage && chatMessage.map((cm) => (
          cm.messages.map((mes) => (
            <Incoming Text={mes} Name={cm.friend}/>
          ))
        ))}
      </div>
      <div className="flex flex-roww-full justify-end items-center">
        <input placeholder="Send Oscar a message" className="p-1 border-black w-full" onChange={(e) => setInputText(e.target.value)}></input>
        <button className="bg-purple-600 hover:bg-purple-700 px-2 flex-none py-2 m-2 border-black rounded text-white" onClick={click}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>
    </div>
  );
}
