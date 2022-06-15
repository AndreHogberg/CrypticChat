import React from "react";
import { useEffect, useState } from "react";
import agent from "../../lib/agent";
import { requestDto } from "../../lib/models/friends";

const requestFriend = () => {
  const [requests, setRequests] = useState<requestDto[]>([]);
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const data = await agent.Requests.newRequest();
    console.log(data);
    setRequests(data);
    console.log(requests);
  };

  return <div>requestFriend</div>;
};

export default requestFriend;
