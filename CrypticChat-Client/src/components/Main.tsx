import { Link, Outlet } from "react-router-dom";

export default function Main(){
    return (<div className="flex w-5/6 h-full bg-gray-200">
        <Outlet/>
    </div>)
}