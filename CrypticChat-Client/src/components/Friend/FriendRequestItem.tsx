import { MdDone, MdClear } from "react-icons/md";
import { useDispatch } from "react-redux";
import agent from "../../lib/agent";
import { addFriend } from "../../redux/slices/friendSlice";
import { removeRequest } from "../../redux/slices/requestSlice";

interface Props {
  friendId: string;
  username: string;
  email: string;
}

export default function FriendRequestItem({ friendId, username }: Props) {
  const dispatch = useDispatch();
  const accept = async () => {
    const friend = await agent.Requests.requestAnswer({
      friendId,
      answer: true,
    });
    dispatch(addFriend(friend));
    dispatch(removeRequest(friendId));
  };
  const decline = async () => {
    await agent.Requests.requestAnswer({ friendId, answer: false });
    dispatch(removeRequest(friendId));
  };

  return (
    <div className="flex flex-row w-full h-20 items-center justify-between border-b-2 border-purple-300 last:border-b-0">
      <div className="flex flex-row h-full w-full items-center justify-start space-x-2">
        <img
          className="w-8 rounded-sm"
          src={`https://avatars.dicebear.com/api/adventurer-neutral/${username}.svg`}
        />
        <div className="text-lg">{username}</div>
      </div>
      <div className="flex flex-row justify-between space-x-1">
        <button
          className="flex justify-center items-center w-10 h-10 rounded-md text-green hover:border-2 hover:border-green"
          onClick={accept}
        >
          <MdDone />
        </button>
        <button
          className="flex justify-center items-center w-10 h-10 rounded-md text-red hover:border-2 hover:border-red"
          onClick={decline}
        >
          <MdClear />
        </button>
      </div>
    </div>
  );
}
