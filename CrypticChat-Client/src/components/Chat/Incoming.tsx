import ReactTimeAgo from "react-time-ago";

interface Props {
  Text: string;
  Name: string;
}

export default function Incoming({ Text, Name }: Props) {
  return (
    <div className="flex flex-row w-1/2">
      <div className="bg-purple-300 rounded pt-1 pb-1 pl-1 pr-1">
        <div className="col-1">
          <p className="text-sm text-bold text-white">{Name}</p>
        </div>
        <div className="col-1 justify end">
          <p className="text-xs text-white">
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
