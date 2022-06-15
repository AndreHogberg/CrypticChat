import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import agent from "../../lib/agent";
import { friend } from "../../lib/models/Friend";
import FriendList from "../SideBar/Friends/FriendList";
import Friend from "../SideBar/Friends/Friend";
import AddFriend from "./AddFriend";
import RequestFriend from "./requestFriend";

const ManageFriends = () => {
  const [toggleView, setToggleView] = useState(false);
  return (
    <div className="flex flex-col w-full h-full items-center space-y-1">
      <div className="flex w-3/4 flex-row space-x-3">
        <button
          onClick={() => setToggleView(false)}
          className={
            !toggleView
              ? "w-1/2 border-b-2 border-purple-300"
              : "w-1/2 hover:border-b-2 hover:border-purple-300"
          }
        >
          Search
        </button>
        <button
          onClick={() => setToggleView(true)}
          className={toggleView ? "w-1/2 border-b-2 border-purple-300" : "w-1/2 hover:border-b-2 hover:border-purple-300"}
        >
          Requests
        </button>
      </div>
      <div className="flex flex-row h-full w-3/4 space-x-3">
        {!toggleView && <AddFriend />}
        {toggleView && <RequestFriend />}
      </div>
    </div>
  );
};

export default ManageFriends;
