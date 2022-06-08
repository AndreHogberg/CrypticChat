import { Link } from "react-router-dom"

interface Props{
    name: string
    friendId: string
}

export default function Friend({name, friendId}: Props){

    return(
        <Link className="flex flex-row w-full" to={`/chat/${friendId}`} reloadDocument={true}>
            <div className="flex flex-row w-full h-10 space-x-3 p-1 justify-start items-center hover:bg-purple-700 rounded-md hover: cursor-pointer">
                <img className="w-8 h-8 border-2 border-purple-700 hover:border-purple-600 hover:border-2" src={`https://avatars.dicebear.com/api/adventurer-neutral/${friendId}.svg`}/>
                <div>{name}</div>
            </div>
        </Link>
        
    )
}