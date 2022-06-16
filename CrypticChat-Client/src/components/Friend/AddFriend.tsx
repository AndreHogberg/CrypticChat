import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import agent from "../../lib/agent";
import { friend } from "../../lib/models/Friend";
import FriendList from "../SideBar/Friends/FriendList";
import Friend from "../SideBar/Friends/Friend";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const AddFriend = () => {
  const [email, setEmail] = useState("");
  const [userlist, setUserlist] = useState<friend[]>([]);

  async function buttonClickSearch() {
    const friends = await agent.Search.newSearch(email);
    console.log(friends);
    setUserlist(friends);
  }

  async function buttonClickAdd(email: string) {
    console.log(email);
    const response = await agent.Friend.add(email).catch((err) =>
      console.log(err)
    );
    toast.success(`Sent a request to ${email}`);
  }

  return (
    <div className="w-full">
      <div className="pb-2 pt-4 flex justify-center">
        <p className="text-black text-2xl font-bold">Find a friend</p>
      </div>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="input-group relative flex items-stretch w-full mb-4">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              type="button"
              id="button-addon3"
              onClick={buttonClickSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {userlist.map((data) => (
          <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center border-2 border-black">
            <div className="py-3 px-6 border-b border-gray-300">
              <img
                src={`https://avatars.dicebear.com/api/adventurer-neutral/${data.username}.svg`}
                className="w-1/2 rounded-lg"
                alt=""
              />
            </div>
            <div className="p-6">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {data.username}
              </h5>
              <p className="text-gray-700 text-base mb-4">{data.email}</p>
              <button
                type="button"
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                <IoMdAddCircleOutline size={20} />
              </button>
            </div>
            <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
              2 days ago
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFriend;
