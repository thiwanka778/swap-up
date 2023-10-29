import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequestTokens, getScreenWidth } from "./redux/userSlice";
import SignupAuth from "./protectedRoutes/SignupAuth";
import SignUp2 from "./pages/SignUp2/SignUp2";
import AuthenticatedHome from "./pages/AuthenticatedHome/AuthenticatedHome";
import LoginAuth from "./protectedRoutes/LoginAuth";
import QualityCheck from "./pages/user/QualityCheck/QualityCheck";
import Swap from "./pages/user/Swap/Swap";
import Donate from "./pages/user/Donate/Donate";
import Complaints from "./pages/user/Complaints/Complaints";
import Profile from "./pages/user/Profile/Profile";
import UserPagesAuthenticated from "./protectedRoutes/UserPagesAuthenticated";
import QualityCheckAuth from "./pages/quality_checker/QualityCheckAuth/QualityCheckAuth";
import VerifyPage from "./pages/user/VerifyPage/VerifyPage";
import QualityCheckerComplaint from "./pages/quality_checker/QualityCheckerComplaint/QualityCheckerComplaint";
import QualityCheckerProfile from "./pages/quality_checker/QualityCheckerProfile/QualityCheckerProfile";
import QualityCheckerAuthenticated from "./protectedRoutes/QualityCheckerAuthenticated";
import AdminPagesAuth from "./protectedRoutes/AdminPagesAuth";
import UserComplaints from "./pages/admin/UserComplaints/UserComplaints";
import ViewProfile from "./pages/admin/ViewProfile/ViewProfile";
import ManageUsers from "./pages/admin/ManageUsers/ManageUsers";
import InventoryManagerAuth from "./protectedRoutes/InventoryManagerAuth";
import Listing from "./pages/quality_checker/Listing/Listing";
import FavoriteItemPage from "./pages/user/FavoriteItemPage/FavoriteItemPage";
import StaffSignup from "./pages/admin/StaffSignup/StaffSignup";
import AdminProfile from "./pages/admin/AdminProfile/AdminProfile";
import InventoryManagerProfile from "./pages/inventoryManager/InventoryManagerProfile/InventoryManagerProfile"
import InventoryManagerComplaint from "./pages/inventoryManager/InventoryManagerComplaint/InventoryManagerComplaint";
import DonationRequest from "./pages/inventoryManager/DonationRequest/DonationRequest";
import SwapRequest from "./pages/inventoryManager/SwapRequest/SwapRequest";
import TokenRequest from "./pages/inventoryManager/TokenRequest/TokenRequest";
import HelpAssistantAuth from "./protectedRoutes/HelpAssistantAuth";
import HelpRequest from "./pages/helpAssistant/HelpRequest/HelpRequest";
import Membership from "./pages/user/Membership/Membership";
import ProfileAuth from "./protectedRoutes/ProfileAuth";
import FileSystem from "./FileSystem";
import ItemViewPage from "./pages/user/ItemViewPage/ItemViewPage";
import PaymentSuccess from "./pages/user/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "./pages/user/PaymentCancel/PaymentCancel";





function App() {
  const dispatch = useDispatch();
  const {user,screen}=useSelector((state)=>state.user);

//   React.useEffect(()=>{
    
//     const userId = user?.userId;
//     const email = user.email;
//     dispatch(fetchAllRequestTokens({userId,email}))
  

// },[])
  // const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => {
      // setScreenWidth(window.innerWidth);
      dispatch(getScreenWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="app">
      <NavBar />
      
          <Routes>

            <Route  path="file-system" element={<FileSystem/>}/>

          {!user ?   <Route path="/" element={<Home />} />:
            <Route path="/" element={<AuthenticatedHome/>}/>}


            <Route element={<LoginAuth/>}>
            <Route path="login" element={<Login />} />
            </Route>

            <Route path="item-view-page/:id" element={<ItemViewPage/>}/>

            <Route element={<SignupAuth />}>
              {/* <Route path="signup" element={<SignUp />} /> */}
              <Route path="signup" element={<SignUp2/>}/>
            </Route>

            <Route element={<ProfileAuth/>}>
            <Route path="profile" element={<Profile/>}/>
            </Route>


      {/* user routes start */}
        <Route element={<UserPagesAuthenticated/>}>
        <Route path="quality-check" element={<QualityCheck/>}/>
            <Route path="swap" element={<Swap/>}/>
            <Route path="donate" element={<Donate/>}/>
            <Route path="complaints" element={<Complaints/>}/>
            <Route path="user-membership" element={<Membership/>}/>
            <Route path="success" element={<PaymentSuccess/>}/>
          <Route path="cancel" element={<PaymentCancel/>}/>
            <Route path="favorite-items-page" element={<FavoriteItemPage/>}/>
        </Route>
         {/* user routes end */}

         {/* qulaity checker pages start */}

         <Route element={<QualityCheckerAuthenticated/>}>
     
           <Route path="final-request-token-accept" element={<QualityCheckAuth/>}/>
         <Route path="quality-checker-complaints-page"    element={<QualityCheckerComplaint/>}/>
         <Route path="quality-checker-profile-page" element={<QualityCheckerProfile/>}/>
                  <Route path="listing" element={<Listing/>}/>
           </Route>
            {/* qulaity checker pages end */}



            {/* admin pages auth start */}

            <Route element={<AdminPagesAuth/>}>
              <Route path="user-complaints" element={<UserComplaints/>}/>
              <Route path="admin-profile" element={<AdminProfile/>}/>
              <Route path="manage-users" element={<ManageUsers/>}/>
              <Route path="view-profile/:id" element={<ViewProfile/>}/>
              <Route path="staff-signup" element={<StaffSignup/>}/>

            </Route>

             {/* admin pages auth end */}

{/* inventory auth start */}
             <Route element={<InventoryManagerAuth/>}>
             {/* <Route path="listing" element={<Listing/>}/> */}
        <Route path="swap-request" element={<SwapRequest/>}/>
             <Route path="donation-request" element={<DonationRequest/>}/>
             <Route path="token-request" element={<TokenRequest/>}/>
       {/* <Route path="inventory-manager-profile" element={<InventoryManagerProfile/>}/> */}
      
       <Route path="inventory-manager-complaint" element={<InventoryManagerComplaint/>}/>
             </Route>

         

             {/* inventory auth end */}



             {/* help assistant auth start */}

             <Route element={<HelpAssistantAuth/>}>
              {/* <Route path="help-request" element={<HelpRequest/>}/> */}
             </Route>

             
             {/* help assistant auth end*/}

             
           

        

         <Route path="verifycode/:id" element={<VerifyPage/>}/>



            
          </Routes>
       

      <Footer />
    </main>
  );
}

export default App;
