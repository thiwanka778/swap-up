import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const InventoryManagerAuth=()=>{
    const location = useLocation();
    const {user}=useSelector((state)=>state.user);
   

    return (
        user?.role?.toLowerCase().trim()=="inventory_manager"
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default InventoryManagerAuth;