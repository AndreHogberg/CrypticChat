import React from "react";

interface Props {
  Text: string;
}

export default function Outgoing({ Text }: Props) {
  return (
    <div className="flex flex-row bg-blue-300 rounded pt-1 pb-1 pl-1 pr-1 justify-end">
      <p className="text-white">{Text}</p>
    </div>
  );
}
