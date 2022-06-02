import { Link, Outlet } from "react-router-dom";

export default function Main(){
    return (<div className="flex w-5/6 h-full text-white bg-main-gray">
        <Outlet/>
    </div>)
}