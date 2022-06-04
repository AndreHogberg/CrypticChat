import Incoming from "../Chat/Incoming";
import Outgoing from "../Chat/Outgoing";

export default function Chat() {
  return (
    <div className="w-screen relative px-2 py-2">
      <Incoming Text="Incoming Text!" />
      <Outgoing Text="Outgoing text!" />
    </div>
  );
}
