import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const QualityCheckerAuthenticated=()=>{
    const location = useLocation();
    const {userEmail,user}=useSelector((state)=>state.user);
    //duhfvhufv

    return (
        user==="qualityChecker"
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default QualityCheckerAuthenticated;