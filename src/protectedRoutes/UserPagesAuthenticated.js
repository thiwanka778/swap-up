import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const UserPagesAuthenticated=()=>{
    const location = useLocation();
    const {userEmail,user}=useSelector((state)=>state.user);
    //duhfvhufv

    return (
        user==="user"
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default UserPagesAuthenticated;