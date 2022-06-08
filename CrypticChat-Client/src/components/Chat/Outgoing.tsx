import ReactTimeAgo from "react-time-ago";

interface Props {
  Text: string;
  Name: string;
  Date: Date
}

export default function Outgoing({ Text, Name, Date }: Props) {
  return (
    <div className="flex flex-row justify-end mt-1">
      <div className="bg-purple-600 rounded pt-1 pb-1 pl-1 pr-1 w-1/2 grid grid-cols-2">
        <div className="col-1">
          <p className="text-xs text-white font-bold">{Name}</p>
        </div>
        <div className="col-1">
          <p className="text-xs text-white flex justify-end">
            <ReactTimeAgo date={Date} />
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-white text-sm">{Text}</p>
        </div>
      </div>
    </div>
  );
}
