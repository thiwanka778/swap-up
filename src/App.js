import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { useDispatch } from "react-redux";
import { getScreenWidth } from "./redux/userSlice";
import SignupAuth from "./protectedRoutes/SignupAuth";
import SignUp2 from "./pages/SignUp2/SignUp2";

function App() {
  const dispatch = useDispatch();
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
            <Route path="/" element={<Home />} />

            <Route path="login" element={<Login />} />

            <Route element={<SignupAuth />}>
              {/* <Route path="signup" element={<SignUp />} /> */}
              <Route path="signup" element={<SignUp2/>}/>
            </Route>
          </Routes>
       

      <Footer />
    </main>
  );
}

export default App;
