import FriendList from "./Friends/FriendList";

export default function SideBar(){
    return(
        <div className="flex flex-col w-1/6 h-full bg-gray-700 text-gray-300">
            <div className="flex text-3xl w-full justify-center items-center h-1/6">CrypticChat</div>
            <FriendList/>
        </div>
    )
}