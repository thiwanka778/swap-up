import React from "react";
import "./Login.css";
import swaplogo from "../../assets/swaplogo.png";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { userLogout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { userLogin,resetUser ,userLoginTemp} from "../../redux/userSlice";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import WarningToast from "../../components/warningToast/WarningToast";

const pStyles = {
  fontSize: "1.2rem",
  fontFamily: "'Ubuntu', sans-serif",
  fontWeight: "500",
  letterSpacing: "0.1rem",
  marginTop: "1.5rem",
  color: "white",
};

const inputBoxStyles = {
  borderRadius: "4px",
  border: "1px solid #939599",
  boxShadow: "none",
  fontSize: "1rem",
  padding: "1rem",
  width: "100%",
  fontWeight: "500",
  fontFamily: " 'Poppins', sans-serif",
  letterSpacing: "0.1rem",
  marginTop: "0.3rem",
  // marginBottom: "1.5rem",
};

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { screen,userLoading,userError,userLoginStatus } = useSelector((state) => state.user);
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });


  React.useEffect(()=>{
if(userLoading==false && userLoginStatus==true){
  dispatch(resetUser())
}else if(userError=="Request failed with status code 401"){
  toast.error("Sorry, Your account is disabled. Please contact the administrator.")
}
  },[userLoading])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    let inputValue="";
  if(name==="email"){
     inputValue=value.trim();
  }else{
     inputValue=value;
  }
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [name]: inputValue,
      };
    });
  };

  const loginBtnClick=()=>{

    // if(loginForm.email!=="" && loginForm.password!==""){
    //   const {email,password}=loginForm;
    //   if(email==="user" || email==="qualityChecker" || email==="admin" || email==="inventoryManager"){
    //     dispatch(userLoginTemp(email));
    //     navigate("/");

    //   }
    // }

   const {email,password} =loginForm;

   if(email==="admin"){
      
        dispatch(userLoginTemp(email));
        navigate("/");

      

   }else{
    if(email=="" || password ==""){
      toast.custom(<WarningToast message={"Email and password can't be empty !"}/>)
     }else if(email!=="" && password!==""){
      dispatch(userLogin({email,password}))
     }
   }

   

   


  }

 

  return (
    <>
    <div className="login">
      <div
        className="login-container"
        style={{
          width: screen < 420 ? "100%" : "400px",
          display: "flex",
          justifyContent: "center",
          background: "#00425A",
          borderRadius: "8px",
          marginTop: "12vh",
        }}
      >
        <img src={swaplogo} className="inner" />

        <div
          style={{
            marginTop: "50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "80%" }}>
            <p style={pStyles}>Email</p>
            <Input
              style={inputBoxStyles}
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={loginForm.email}
            />

            <p style={pStyles}>Password</p>
            <Input.Password
              style={inputBoxStyles}
              placeholder="Password"
              onChange={handleInputChange}
              value={loginForm.password}
              name="password"
            />

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "1.5rem 0 1.5rem 0",
              }}
            >
              <button className="login-btn2" onClick={loginBtnClick}>LOGIN</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <Backdrop
        sx={{ color: 'blue',}}
        open={userLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          custom: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />




    </>
  );
};

export default Login;
