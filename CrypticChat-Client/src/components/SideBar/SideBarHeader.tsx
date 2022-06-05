import {MdLogout} from "react-icons/md"
import { useAppSelector } from "../../redux/hooks"
export default function SideBarHeader(){
    const user = useAppSelector(state => state.user);
    return(
        <div className="flex flex-row bg-black p-2 bg-opacity-30 text-white w-full space-x-2 h-1/6">
            <div className="flex flex-col h-full space-y-4 w-2/4">
                <div>
                    <img
                    className="w-16 bg-white rounded-full" 
                    src="https://avatars.dicebear.com/api/human/asdasd.svg"/>
                </div>
                <div className="text-md ml-1">{user.userName}</div>
            </div>
            <div className="flex flex-col items-end h-full w-2/4">
                <MdLogout size={24} className="text-white hover:text-purple-600"/>
            </div>
        </div>
        )
}