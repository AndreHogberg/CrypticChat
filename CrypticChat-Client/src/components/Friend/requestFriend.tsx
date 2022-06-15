import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import agent from "../../lib/agent";
import { requestDto } from "../../lib/models/friends";

const requestFriend = () => {
  const [requests, setRequests] = useState<requestDto[]>([]);
  agent.Requests.newRequest().then((data) => setRequests(data));
  useMemo(() => {
    console.log(requests);
  }, [requests]);
  return <div>requestFriend</div>;
};

export default requestFriend;
