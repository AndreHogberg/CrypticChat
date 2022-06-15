import { useEffect, useState } from "react";
import agent from "../../../lib/agent";
import { friend } from "../../../lib/models/Friend";
import Friend from "./Friend";

export default function FriendList() {
  const [friendList, setFriendList] = useState<friend[]>([]);

  useEffect(() => {
    agent.Friend.getAll().then((data) => setFriendList(data));
  }, []);

  return (
    <div className="flex flex-col items-center overflow-auto p-2 w-full h-5/6">
      {friendList.map((friend) => (
        <Friend
          name={friend.username}
          friendId={friend.friendId}
          key={friend.friendId}
        />
      ))}
    </div>
  );
}
