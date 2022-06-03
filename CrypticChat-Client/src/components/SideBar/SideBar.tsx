import FriendList from "./Friends/FriendList";
import SideBarHeader from "./SideBarHeader";

export default function SideBar(){
    return(
        <div className="flex flex-col w-1/6 h-full bg-purple-600 text-white">
            <SideBarHeader/>
            <FriendList/>
        </div>
    )
}