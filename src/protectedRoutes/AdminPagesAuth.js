import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const AdminPagesAuth=()=>{
    const location = useLocation();
    const {userEmail,user}=useSelector((state)=>state.user);
    //duhfvhufv

    return (
        user==="admin"
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default AdminPagesAuth;