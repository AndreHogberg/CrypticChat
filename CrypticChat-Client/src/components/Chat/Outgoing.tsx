import ReactTimeAgo from "react-time-ago";

interface Props {
  Text: string;
  Name: string;
}

export default function Outgoing({ Text, Name }: Props) {
  return (
    <div className="flex flex-row justify-end">
      <div className="bg-purple-600 rounded pt-1 pb-1 pl-1 pr-1 w-1/2 grid grid-cols-2">
        <div className="col-1">
          <p className="text-xs text-white font-bold">{Name}</p>
        </div>
        <div className="col-1">
          <p className="text-xs text-white flex justify-end">
            <ReactTimeAgo date={new Date()} />
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-white text-sm">{Text}</p>
        </div>
      </div>
    </div>
  );
}
