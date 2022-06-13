import Friend from "./Friend";

export default function FriendList() {
  return (
    <div className="flex flex-col items-center overflow-auto p-2 w-full h-5/6">
      <Friend name="John" friendId="123" chatRoom="test" />
      <Friend name="Oscar" friendId="333" chatRoom="hallå" />
      <Friend name="Mattias" friendId="555" chatRoom="yooo" />
    </div>
  );
}
