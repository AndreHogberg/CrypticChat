import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import agent from "../../../lib/agent";
import { friend } from "../../../lib/models/Friend";
import { useAppSelector } from "../../../redux/hooks";
import { bulkAdd } from "../../../redux/slices/friendSlice";
import { store } from "../../../redux/store";
import Friend from "./Friend";

export default function FriendList() {
  const { friends } = useAppSelector((state) => state.friend);
  const dispatch = useDispatch();
  useEffect(() => {
    agent.Friend.getAll().then((data) => dispatch(bulkAdd(data)));
  }, []);

  return (
    <div className="flex flex-col items-center overflow-auto p-2 w-full h-5/6">
      {friends.map((friend) => (
        <Friend
          name={friend.username}
          friendId={friend.friendId}
          key={friend.friendId}
        />
      ))}
    </div>
  );
}
