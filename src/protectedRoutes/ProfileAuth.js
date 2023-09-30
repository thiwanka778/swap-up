import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const ProfileAuth=()=>{
    const location = useLocation();
    const {user}=useSelector((state)=>state.user);
    //duhfvhufv

    return (
       ( user?.role.toLowerCase().trim()==="customer" || 
         user?.role.toLowerCase().trim()==="inventory_manager" || 
         user?.role.toLowerCase().trim()==="admin" ||
         user?.role.toLowerCase().trim()==="quality_checker" ||
         user?.role.toLowerCase().trim()==="help_assistant" )
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default ProfileAuth;