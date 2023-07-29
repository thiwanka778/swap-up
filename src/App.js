import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { getScreenWidth } from "./redux/userSlice";
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



function App() {
  const dispatch = useDispatch();
  const {user,screen}=useSelector((state)=>state.user);
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

          {!user ?   <Route path="/" element={<Home />} />:
            <Route path="/" element={<AuthenticatedHome/>}/>}


            <Route element={<LoginAuth/>}>
            <Route path="login" element={<Login />} />
            </Route>

            

            <Route element={<SignupAuth />}>
              {/* <Route path="signup" element={<SignUp />} /> */}
              <Route path="signup" element={<SignUp2/>}/>
            </Route>


      {/* user routes start */}
        <Route element={<UserPagesAuthenticated/>}>
        <Route path="quality-check" element={<QualityCheck/>}/>
            <Route path="swap" element={<Swap/>}/>
            <Route path="donate" element={<Donate/>}/>
            <Route path="complaints" element={<Complaints/>}/>
            <Route path="profile" element={<Profile/>}/>
        </Route>
         {/* user routes end */}


         <Route path="quality-checker-quality-check-page" element={<QualityCheckAuth/>}/>
         <Route path="quality-checker-complaints-page"    element={<QualityCheckerComplaint/>}/>
         <Route path="quality-checker-profile-page" element={<QualityCheckerProfile/>}/>

         <Route path="verifycode/:id" element={<VerifyPage/>}/>

           

            
          </Routes>
       

      <Footer />
    </main>
  );
}

export default App;
