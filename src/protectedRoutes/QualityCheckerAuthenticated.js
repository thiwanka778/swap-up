import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const QualityCheckerAuthenticated=()=>{
    const location = useLocation();
    const {userEmail,user}=useSelector((state)=>state.user);
    //duhfvhufv

    return (
        user?.role?.toLowerCase().trim()==="quality_checker"
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default QualityCheckerAuthenticated;