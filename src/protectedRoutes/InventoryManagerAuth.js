import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const InventoryManagerAuth=()=>{
    const location = useLocation();
    const {userEmail,user}=useSelector((state)=>state.user);
   

    return (
        user?.role=="INVENTORY_MANAGER"
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default InventoryManagerAuth;