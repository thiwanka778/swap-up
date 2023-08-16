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
import { getUserEmail, openSideBarRedux, userLogout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { userEmail, screen, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [validGmail, setValidGmail] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openUser = Boolean(anchorEl);
  // const [openSideBar, setOpenSideBar] = React.useState(() => {
  //   const localOpenSideBar = window.localStorage.getItem("openSideBar");
  //   return localOpenSideBar ? JSON.parse(localOpenSideBar) : false;
  // });

  const [openSideBar,setOpenSideBar]=React.useState(false);
  // const [isSideBarHovered, setIsSideBarHovered] = React.useState(false);
 



  const menuClick = () => {
    dispatch(openSideBarRedux())
    setOpenSideBar((prevState) => {
      const newValue = !prevState;
      // console.log(newValue); // Check the value of openSideBar
      return newValue;
    });
  };

  React.useEffect(() => {
    window.localStorage.setItem("openSideBar", JSON.stringify(openSideBar));
  }, [openSideBar]);

  const handleClickUser = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const logoutBtnClick = () => {
    setAnchorEl(null);
    dispatch(userLogout());
  };

  const handleClickOpen = () => {
    navigate("/signup");
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
          // console.log(result?.user?.email);
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
      <div className="nav">
        <img
          src={swaplogo}
          alt="swapup-logo"
          style={{
            width: "8vh",
            marginLeft: "1.5rem",
            marginRight: user ? "1.5rem" : "auto",
          }}
        />

        {user && (
          <div
            style={{ marginRight: "auto", cursor: "pointer" }}
       
            onClick={menuClick}
          >
            <MenuIcon style={{ color: "white" }} />
          </div>
        )}

        {screen >= 670 && (
          <NavLink to="/" className="nav-text">
            Home
          </NavLink>
        )}
        {screen >= 670 && <p className="nav-text">About Us</p>}
        {screen >= 670 && <p className="nav-text">Contact Us</p>}
        {!user && (
          <button
            className="signup-btn"
            onClick={handleClickOpen}
            style={{ marginRight: "1.5rem" }}
          >
            SIGN UP
          </button>
        )}
        {!user && (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
            style={{ marginRight: "1.5rem" }}
          >
            LOGIN
          </button>
        )}

        {/* {screen<670 && <div style={{marginRight:"1.5rem",cursor:"pointer"}}>
          <MenuIcon style={{color:"white"}}/>
        </div>} */}

        {user && (
          <div
            style={{ marginRight: "1.5rem", cursor: "pointer" }}
            id="basic-button"
            aria-controls={openUser ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openUser ? "true" : undefined}
            onClick={handleClickUser}
          >
            <Avatar alt="" src="#" />
          </div>
        )}
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

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openUser}
        onClose={handleCloseUser}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseUser}>
          <PersonIcon />
          &nbsp;&nbsp;{user?.firstName} {user?.lastName}
        </MenuItem>
        <Divider />
        {!user && (
          <MenuItem onClick={handleClickOpen}>
            <AppRegistrationIcon />
            &nbsp;&nbsp;Sign Up
          </MenuItem>
        )}

        {!user && (
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem onClick={handleCloseUser}>
              <LoginIcon />
              &nbsp;&nbsp;Login
            </MenuItem>
          </Link>
        )}

        <MenuItem onClick={logoutBtnClick}>
          <PowerSettingsNewIcon />
          &nbsp;&nbsp;Logout
        </MenuItem>
      </Menu>

      {openSideBar && user && (
        <div style={{ width: "100%" }}>
          <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
        </div>
      )}











    </>
  );
};

export default NavBar;
