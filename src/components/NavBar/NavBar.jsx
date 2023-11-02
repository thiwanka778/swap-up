import React, { useState, useEffect } from "react";
import "./NavBar.css";
import swaplogo from "../../assets/swaplogo.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import toast, { Toaster } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import TryIcon from "@mui/icons-material/Try";
import Badge from "@mui/material/Badge";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import WarningToast from "../../components/warningToast/WarningToast";
import {
  getUserEmail,
  openSideBarRedux,
  userLogout,
  closeSideBarRedux,
  getUserById,
} from "../../redux/userSlice";
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
import { fetchFavoriteItemsByUser } from "../../redux/inventorySlice";
import { SubscriptionsOutlined } from "@mui/icons-material";

const NavBar = () => {
  const location = useLocation();
  const {
    inventoryLoading,
    inventoryErrorMessage,
    inventoryError,
    inventoryCreateItemStatus,
    listingItems,
    addFavoriteStatus,
    favoriteList,
    deleteFavoriteStatus,
    inventoryStatus,
  } = useSelector((state) => state.inventory);
  const currentPath = location.pathname;
  const { userEmail, screen, user, openRedux,profile } = useSelector(
    (state) => state.user
  );
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

  const [openSideBar, setOpenSideBar] = React.useState(false);
  // const [isSideBarHovered, setIsSideBarHovered] = React.useState(false);

  const [state, setState] = React.useState({
    left: false,
  });

  const menuClick = () => {
    dispatch(openSideBarRedux());
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

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  React.useEffect(() => {
    // console.log("state",state)
    if (state.left === false) {
      dispatch(closeSideBarRedux());
      setOpenSideBar((prevState) => {
        const newValue = false;
        // console.log(newValue); // Check the value of openSideBar
        return newValue;
      });
    } else if (state.left === true) {
      dispatch(openSideBarRedux());
      setOpenSideBar((prevState) => {
        const newValue = true;
        // console.log(newValue); // Check the value of openSideBar
        return newValue;
      });
    }
  }, [state]);

  React.useEffect(() => {
    if (openRedux === false) {
      setState((prevState) => {
        return { left: false };
      });
      setOpenSideBar((prevState) => {
        const newValue = false;
        // console.log(newValue); // Check the value of openSideBar
        return newValue;
      });
    }
  }, [openRedux]);

  React.useEffect(() => {
    dispatch(getUserById(user?.userId));
  }, [user]);

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

            // onClick={menuClick}
          >
            <MenuIcon
              style={{ color: "white" }}
              onClick={toggleDrawer("left", true)}
            />
          </div>
        )}

        {screen >= 670 && (
          <NavLink to="/" className="nav-text">
            Home
          </NavLink>
        )}
        {/* {screen >= 670 && <p className="nav-text">About Us</p>}
        {screen >= 670 && <p className="nav-text">Contact Us</p>} */}

        {user && user?.role === "CUSTOMER" && (
          <div className="nav-text">
            <Badge badgeContent={favoriteList?.length} color="primary">
              <TryIcon
                style={{ fontSize: "3rem", cursor: "pointer" }}
                onClick={() => navigate("/favorite-items-page")}
              />
            </Badge>
          </div>
        )}

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
            <Avatar alt="" src={profile.profilePicture} />
          </div>
        )}
      </div>

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
        style={{ zIndex: "50000" }}
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
          &nbsp;&nbsp;{profile?.firstName} {profile?.lastName}
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

      {user && (
        <div key={"left"}>
          <Drawer
            style={{ zIndex: "20000" }}
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <Box
              sx={{
                width: "left" === "top" || "left" === "bottom" ? "auto" : 260,
                height: "100vh",
                zIndex: "20000",
              }}
              role="presentation"
              onClick={toggleDrawer("letf", false)}
              onKeyDown={toggleDrawer("left", false)}
            >
              <div style={{ width: "100%" }}>
                <SideBar
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </div>
            </Box>
          </Drawer>
        </div>
      )}
    </>
  );
};

export default NavBar;
