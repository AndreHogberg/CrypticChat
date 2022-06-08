import { useState, useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { UserMessage } from "../../lib/models/Message";
import chatConnection from "../../lib/signalR";
import { useAppSelector } from "../../redux/hooks";
import Incoming from "./Incoming";
import Outgoing from "./Outgoing";

interface Props {
    friendId: string
}

export default function ChatBox({friendId}: Props){
    const {chat,user} = useAppSelector(state => state);
    const [myMessages, setMyMessages] = useState<UserMessage[]>([]);
    const [inputText, setInputText] = useState<UserMessage>({userName: "", message: "", date: null}); 
    const [concatMessages, setConcatMessages] = useState<UserMessage[]>([]);
    const [friend, setFriend] = useState(friendId);
    useEffect(() => {

    const filteredMessages = chat.chatMessage.filter(x => x.userName === friendId);

    const newMessageList = filteredMessages.concat(myMessages);
    console.log(newMessageList);
    newMessageList.sort((a,b) => a.date!.getTime() - b.date!.getTime());
    setConcatMessages(newMessageList);
  
  },[chat.chatMessage,myMessages,friendId]);

  const click = () => {
    chatConnection.invoke("NewMessage",inputText.message, friendId, user.userName)
    setMyMessages(myMessages.concat(inputText))
    setInputText({userName: "", message: "", date: null})
  }
    return (
        <div className="flex flex-col w-full h-full px-2 py-2 bg-gradient-to-b justify-between space-y-5 from-white to-gray-90">
        <div className="flex flex-col w-full h-full overflow-auto">
          {concatMessages && concatMessages.map((message) => (
            message.userName === friendId ? (
              <Incoming Text={message.message} Name={message.userName} Date={message.date!}/>
          ) : (
            <Outgoing Text={message.message} Name={message.userName} Date={message.date!}/>
          )
          ))}
        </div>
        <div className="flex flex-roww-full justify-end items-center">
          <input value={inputText.message} placeholder="Send Oscar a message" className="p-1 border-black w-full" onChange={(e) => setInputText(state => state = {userName: user.userName, message: e.target.value, date: new Date()})}></input>
          <button className="bg-purple-600 hover:bg-purple-700 px-2 flex-none py-2 m-2 border-black rounded text-white" onClick={click}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </div>
    )
}