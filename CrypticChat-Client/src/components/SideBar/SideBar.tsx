import FriendList from "./Friends/FriendList";
import SideBarHeader from "./SideBarHeader";

export default function SideBar(){
    return(
        <div className="flex flex-col w-1/6 h-full bg-gray-700 text-gray-300">
            <SideBarHeader/>
            <FriendList/>
        </div>
    )
}