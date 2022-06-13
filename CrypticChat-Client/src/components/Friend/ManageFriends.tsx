import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import agent from "../../lib/agent";
import { friend } from "../../lib/models/friends";
import FriendList from "../SideBar/Friends/FriendList";
import Friend from "../SideBar/Friends/Friend";

const ManageFriends = () => {
  const [email, setEmail] = useState("");
  const [userlist, setUserlist] = useState<friend[]>([]);

  useMemo(() => {
    console.log(userlist);
  }, [userlist]);

  async function buttonClickSearch() {
    const friends = await agent.Search.newSearch(email);
    console.log(friends);
    setUserlist(friends);
  }

  async function buttonClickAdd(email: string) {
    console.log(email);
    const response = await agent.AddFriend.add(email);
  }

  return (
    <div className="flex flex-auto">
      <div className="w-full flex-row">
        <button className="w-1/2 pb-2 border-b-2 border-r-2 border-black">
          Search
        </button>
        <button className="w-1/2 pb-2 border-b-2 border-black">Requests</button>
        <div className="pt-4 pl-4">
          <p className="text-black text-2xl">Search for a friend</p>
        </div>
        <div className="pt-4 pl-2">
          <input
            type={"text"}
            className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300
        rounded transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-purple-300 focus:outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="pl-2 pr-2 border-2 border-black"
            onClick={buttonClickSearch}
          >
            <AiOutlineSearch size={32} className="pt-2" />
          </button>
        </div>
        <div className="">
          <ul className="">
            {userlist.map((data) => (
              <li className="flex items-center justify-between p-3 hover:text-purple-600">
                <div>
                  <p className="text-2xl">{data.username}</p>
                  <p>{data.email}</p>
                </div>
                <div>
                  <button onClick={() => buttonClickAdd(data.email)}>
                    <IoMdAddCircleOutline size={32} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageFriends;
