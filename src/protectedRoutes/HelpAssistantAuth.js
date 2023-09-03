import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const HelpAssistantAuth=()=>{
    const location = useLocation();
    const {userEmail,user}=useSelector((state)=>state.user);
   

    return (
        user?.role?.toLowerCase().trim()=="help_assistant"
        ?<Outlet/>
        :<Navigate to="/" state={{from:location}} replace />

    )
}

export default HelpAssistantAuth;