import { MdHome, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/userSlice";
export default function SideBarHeader() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row bg-black p-2 bg-opacity-30 text-white w-full space-x-2 h-1/6">
      <div className="flex flex-col h-full space-y-4 w-2/4">
        <div>
          <img
            className="w-16 bg-white rounded-full border-purple-600 border-2"
            src={`https://avatars.dicebear.com/api/initials/${user.userName}.svg`}
          />
        </div>
        <div className="text-md ml-1">{user.userName}</div>
      </div>
      <div className="flex flex-col items-end h-full justify-between w-2/4">
        <MdLogout
          size={24}
          className="text-white hover:text-purple-300 hover:cursor-pointer"
          onClick={() => dispatch(logout())}
        />
        <MdHome
          size={24}
          className="text-white hover:text-purple-300 hover:cursor-pointer"
          onClick={() => navigate("/Welcome")}
        />
      </div>
    </div>
  );
}
