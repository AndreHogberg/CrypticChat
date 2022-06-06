import Incoming from "../Chat/Incoming";
import Outgoing from "../Chat/Outgoing";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function Chat() {
  return (
    <div className="flex flex-col w-full h-full px-2 py-2 bg-gradient-to-b justify-between space-y-5 from-white to-gray-90">
      <div className="flex flex-col w-full h-full overflow-auto">
        <Incoming
          Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          Name="Oscar"
        />
        <Outgoing
          Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          Name="André"
        />
        <Incoming
          Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          Name="Oscar"
        />
        <Outgoing
          Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          Name="André"
        />
        <Incoming Text="En kort text" Name="Oscar" />
        <Outgoing Text="En kort text" Name="André" />
      </div>
      <div className="flex flex-roww-full justify-end items-center">
        <input
          placeholder="Send Oscar a message"
          className="p-1 border-black w-full"
        ></input>
        <button className="bg-purple-600 hover:bg-purple-700 px-2 flex-none py-2 m-2 border-black rounded text-white">
          <BsFillArrowRightCircleFill />
        </button>
      </div>
    </div>
  );
}
