import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import agent from "../../lib/agent";
import { requestDto } from "../../lib/models/Friend";
import { useAppSelector } from "../../redux/hooks";
import { bulkAdd } from "../../redux/slices/requestSlice";
import FriendRequestItem from "./FriendRequestItem";

const requestFriend = () => {
  const { requests } = useAppSelector((state) => state.request);
  const dispatch = useDispatch();
  useEffect(() => {
    agent.Requests.newRequest().then((data) => dispatch(bulkAdd(data)));
  }, []);
  return (
    <div className="flex flex-col w-full h-full space-y-1">
      <div className="flex items-end w-full h-16 text-2xl border-b-2 border-purple-700">
        Friend Requests
      </div>
      <div className="w-full h-full flex flex-col space-y-1">
        {requests.map((req) => (
          <>
            <FriendRequestItem
              friendId={req.friendId}
              username={req.username}
              email={req.email}
              key={req.friendId}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default requestFriend;
