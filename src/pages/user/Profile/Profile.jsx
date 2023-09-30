import React from "react";
import "./Profile.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import Rating from "@mui/material/Rating";
import Input from "antd/es/input/Input";
import EditIcon from "@mui/icons-material/Edit";
import { Tabs } from "antd";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import {EditOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import EditProfilePicture from "./EditProfilePicture";
import { getUserById } from "../../../redux/userSlice";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: <span style={{fontFamily: "'Inter', sans-serif",
    fontSize:"1rem",letterSpacing:"0.1rem",
    fontWeight:"bold"}}>Edit Profile</span>,
    children: <EditProfile />,
  },
  {
    key: "2",
    label:<span style={{fontFamily: "'Inter', sans-serif",
    fontSize:"1rem",letterSpacing:"0.1rem",
    fontWeight:"bold"}}>Change Password</span>,
    children: <ChangePassword />,
  },
  {
    key: "3",
    label:<span style={{fontFamily: "'Inter', sans-serif",
    fontSize:"1rem",letterSpacing:"0.1rem",
    fontWeight:"bold"}}>Edit Profile Picture</span>,
    children: <EditProfilePicture />,
  },
];

const Profile = () => {
  const dispatch=useDispatch();
  const { screen, openRedux,user,profile } = useSelector((state) => state.user);

  React.useEffect(()=>{
    dispatch(getUserById(user?.userId))
  },[]);


  return (
    <div
      className="profile"
      style={{ paddingLeft: openRedux && screen > 650 ? "270px" : "0rem" }}
    >
      <div
        className="profile-container"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: screen < 725 ? "column" : "row",
          // alignItems: "center",
        }}
      >
        <section
          style={{
            width: screen < 725 ? "100%" : "400px",
            height: screen < 725 ? "" : "83vh",
            display: "flex",
            padding: "1rem",
            alignItems: "center",
            flexDirection: "column",
            overflowY:"auto",
          }}
        >
          <div style={{ padding: "1rem 1rem 0 1rem", overflowY: "auto",}}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                overflowY: "auto",
                borderRadius:"10px",
             
              
              }}
            >
              <img
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                 
                }}
                src={profile?.profilePicture===""?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png":profile?.profilePicture}
              />
             
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                
                <p
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "1rem",
                    fontFamily: "'Inter', sans-serif",
                    marginTop: "0.4rem",
                  }}
                >
                  {profile?.role}
                </p>
              </div>
              <p
                style={{
                  color: "#00425A",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  fontFamily: "'Inter', sans-serif",
                  marginTop: "0.5rem",
                }}
              >
                {" "}
                {profile?.firstName}  {profile?.lastName}
              </p>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 16px",
                  background: "#04bf1d",
                  borderRadius: "8px",
                }}
              >
                <VerifiedIcon sx={{ color: "white", fontSize: "1.5rem" }} />
                <p
                  style={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "bold",
                    letterSpacing: "0.1rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  Verified
                </p>
              </div>

              <p
                style={{
                  color: "#00425A",
                  fontWeight: "500",
                  fontSize: "1rem",
                  fontFamily: "'Inter', sans-serif",
                  marginTop: "1.5rem",
                }}
              >
                120 Rates
              </p>
              <div style={{ marginTop: "0.5rem" }}>
                <Rating
                  defaultValue={3}
                  precision={0.5}
                  readOnly
                  sx={{
                    "& .MuiRating-iconFilled, & .MuiRating-iconEmpty": {
                      fontSize: 30,
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            height: screen < 725 ? "" : "83vh",
            flex: 1,
            display: "flex",
            width: screen < 725 ? "100%" : "",
            overflowX: screen < 725 ? "auto" : "",
            overflowY: screen < 725 ? "" : "auto",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              overflowY: "auto",
              height: screen < 725 ? "" : "83vh",
              padding:
                screen < 725 ? "0 1rem 1rem 1rem" : "1rem 2rem 1rem 2rem",
              width: "100%",
            }}
          >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
