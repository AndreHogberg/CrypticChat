import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export default function RequireAuth({children}: {children: JSX.Element}){
    let authenticated = useAppSelector((state) => state.user.Authenticated);

    if(!authenticated){
        return <Navigate to="/login" />
    }
    return children
}