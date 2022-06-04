import React from "react";

interface Props {
  Text: string;
}

export default function Incoming({ Text }: Props) {
  return (
    <div className="flex flex-row bg-purple-700 rounded pt-1 pb-1 pl-1 pr-1">
      <p className="text-white text-sm">{Text}</p>
    </div>
  );
}
