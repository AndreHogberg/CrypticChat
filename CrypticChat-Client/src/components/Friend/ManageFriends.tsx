import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import agent from "../../lib/agent";
import { friend } from "../../lib/models/friends";
import FriendList from "../SideBar/Friends/FriendList";
import Friend from "../SideBar/Friends/Friend";
import AddFriend from "./AddFriend";
import RequestFriend from "./requestFriend";

const ManageFriends = () => {
  const [toggleView, setToggleView] = useState(false);
  return (
    <div className="flex flex-auto">
      <div className="w-1/2 flex-row mx-auto">
        <button
          onClick={() => setToggleView(false)}
          className="w-1/2 pb-2 border-b-2 border-r-2 border-black"
        >
          Search
        </button>
        <button
          onClick={() => setToggleView(true)}
          className="w-1/2 pb-2 border-b-2 border-black"
        >
          Requests
        </button>
        <div>
          {!toggleView && <AddFriend />}
          {toggleView && <RequestFriend />}
        </div>
      </div>
    </div>
  );
};

export default ManageFriends;
