import { Outlet } from "react-router-dom";

export default function Main(){
    return (<div className="flex w-5/6 h-full text-black bg-gray-100">
        <Outlet/>
    </div>)
}