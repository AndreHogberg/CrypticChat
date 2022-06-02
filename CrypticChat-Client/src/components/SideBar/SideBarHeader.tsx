import { Link } from "react-router-dom";

export default function SideBarHeader(){
    return(
        <div className="flex flex-col bg-black bg-opacity-30 text-white w-full justify-center items-center h-1/6">
            <div className="">CrypticChat</div>
            <div><Link to={"/add"}>Add someone</Link></div>
        </div>
        )
}