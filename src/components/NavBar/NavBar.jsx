import React, { useState, useEffect } from "react";
import "./NavBar.css";
import swaplogo from "../../assets/swaplogo.png";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import toast, { Toaster } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import WarningToast from "../../components/warningToast/WarningToast";
import { getUserEmail } from "../../redux/userSlice";
import { useDispatch,useSelector } from "react-redux";
import { Input } from "antd";
import { NavLink } from "react-router-dom";

const NavBar = () => {
const {userEmail,screen}=useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [validGmail, setValidGmail] = React.useState(true);

  const handleClickOpen = () => {
if(userEmail===""){
  setOpen(true);
}
    
  };

  const handleClose = () => {
    setOpen(false);
    setValidGmail(true);
    setEmail("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };

  React.useEffect(() => {
    if (email !== "") {
      const charlength = email?.length;
      const requiredIndex = charlength - 10;
      const charslice = email.slice(requiredIndex);
      setValidGmail((prevState) => {
        if (charslice === "@gmail.com") {
          return true;
        } else {
          return false;
        }
      });
    } else {
      setValidGmail(true);
    }
  }, [email]);

  const verifyBtnClick = () => {
    if (email === "") {
      // toast.error('Gmail is required !');
      toast.custom(<WarningToast message={"Gmail is required !"} />);
    } else if (validGmail === false && email !== "") {
      // toast.error('Please enter valid gmail address !');
      toast.custom(
        <WarningToast message={"Please enter valid gmail address !"} />
      );
    } else if (validGmail === true && email !== "") {
      // google sign up firebase function
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result?.user?.email);
          if (result?.user?.email === email) {
            dispatch(getUserEmail(result?.user?.email));
            setOpen(false);
            navigate("/signup");
            setEmail("");
          } else {
            toast.error(
              "Gmail you have entered and verified gmail do not match !"
            );
          }
        })
        .catch((error) => {
          toast.error("Unexpected error. Try again later !");
        });
    }
  };

  return (
    <>
    <div className='nav'>

        <img src={swaplogo} alt='swapup-logo' style={{marginRight:"auto",width:"10vh",marginLeft:"1.5rem"}} />
        <NavLink to="/" className="nav-text">Home</NavLink>
        <p className="nav-text">About Us</p>
        <p className="nav-text">Contact Us</p>
       {userEmail==="" && <button className="signup-btn" onClick={handleClickOpen} style={{marginRight:"1.5rem"}}>SIGN UP</button>}
        <button className="login-btn" onClick={()=>navigate("/login")} style={{marginRight:"1.5rem"}}>LOGIN</button>
        </div>




        <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ background: "ghostwhite" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                fontFamily: " 'Poppins', sans-serif",
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              Please verify your gmail address.
            </p>

            <Input
              placeholder="Enter your gmail"
              value={email}
              onChange={handleEmailChange}
              style={{
                borderRadius: "4px",
                border: "1px solid #d9d9d9",
                boxShadow: "none",
                fontSize: "1rem",
                padding: "1rem",
                width: "100%",
                fontWeight: "500",
                fontFamily: " 'Poppins', sans-serif",
                letterSpacing: "0.1rem",
              }}
            />

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: "1.5rem",
              }}
            >
              {validGmail === false && (
                <p
                  style={{
                    color: "red",
                    fontWeight: "600",
                    fontFamily: " 'Poppins', sans-serif",
                    letterSpacing: "0.1rem",
                    fontSize: "0.8rem",
                  }}
                >
                  *Please enter a valid gmail address.
                </p>
              )}
            </div>

            <button onClick={verifyBtnClick} className="verify-button">
              Verify My Gmail
            </button>
          </div>
        </DialogContent>
      </Dialog>

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
  )
}

export default NavBar