import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const SignupAuth=()=>{
    const location = useLocation();
    const {userEmail}=useSelector((state)=>state.user);

    return (
        userEmail !==""
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default SignupAuth;