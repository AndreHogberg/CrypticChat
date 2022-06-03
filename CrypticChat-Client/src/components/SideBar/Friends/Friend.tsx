interface Props{
    name: string
    friendId: string
}

export default function Friend({name, friendId}: Props){

    return(
        <div className="flex flex-row w-full h-10 space-x-3 p-2 hover:bg-purple-700 rounded-md hover: cursor-pointer">
            <img className="w-5" src={`https://avatars.dicebear.com/api/human/${friendId}.svg`}/>
            <div>{name}</div>
        </div>
    )
}