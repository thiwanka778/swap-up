import React from "react";
import "./Login.css";
import swaplogo from "../../assets/swaplogo.png";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userLogin,userLogout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

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
  const { screen } = useSelector((state) => state.user);
  const [loginForm, setLoginForm] = React.useState({
    gmail: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    let inputValue="";
  if(name==="gmail"){
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
    if(loginForm.gmail!=="" && loginForm.password!==""){
      const {gmail,password}=loginForm;
      if(gmail==="admin@gmail.com" && password==="admin@123"){
        dispatch(userLogin("admin@gmail.com"));
        navigate("/")
      }
    }
  }

 

  return (
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
            <p style={pStyles}>Gmail</p>
            <Input
              style={inputBoxStyles}
              placeholder="Gmail"
              name="gmail"
              onChange={handleInputChange}
              value={loginForm.gmail}
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
  );
};

export default Login;
