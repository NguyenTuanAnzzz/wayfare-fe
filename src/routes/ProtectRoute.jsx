import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectRoute(){
    const {user} = useAuth();
    
    return(
        <Outlet/>
    )
}