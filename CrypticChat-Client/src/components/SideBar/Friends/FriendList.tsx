import { Link } from "react-router-dom";
import Friend from "./Friend";

export default function FriendList(){
    return (
        <div className="flex flex-col items-center overflow-auto p-2 w-full h-5/6">
            <Friend name="john" friendId="123"/>
            <Friend name="Amanda" friendId="333"/>
            <Friend name="Emanuel" friendId="asddasd"/>
            <Friend name="Loushy" friendId="hdfgsf23"/>
        </div>
    )
}