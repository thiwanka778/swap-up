import React from "react";
import "./AdminProfile.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import Rating from "@mui/material/Rating";
import Input from "antd/es/input/Input";
import EditIcon from "@mui/icons-material/Edit";
import { Tabs } from 'antd';
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";



const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: `Edit profile`,
children:<EditProfile/>,
  },
  {
    key: '2',
    label: `Change password`,
    children:<ChangePassword/>,
  },

];



const AdminProfile = () => {
  const {screen}=useSelector((state)=>state.user);

  return (
    <div className="admin-profile">
   
   <div className="profile-container" style={{width:"100%",display:"flex",flexDirection:screen<725?"column": "row",alignItems:"center"}}>

    <section style={{width:screen<725?"100%":"400px",minHeight:screen<725?"":"83vh",
    display:"flex",padding:"1rem",alignItems:'center',flexDirection:"column"}}>

      <div style={{padding:"1rem 1rem 0 1rem",}}>

      <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column"}}>

<img  style={{width:"100%",borderRadius:"8px",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",}}
src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"/>
<div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
<p style={{
        color: "black",
        fontWeight: "600",
        fontSize: "1rem",
        fontFamily: "'Inter', sans-serif",
        marginTop: "0.2rem",
      }} >Admin</p>
</div>
<p style={{
        color: "#00425A",
        fontWeight: "bold",
        fontSize: "1.5rem",
        fontFamily: "'Inter', sans-serif",
        marginTop: "0.5rem",
      }} >  Mr. Ron James</p>
      </div>

      <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column",marginTop:"1.5rem"}}>
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

    <section style={{minHeight:screen<725?"":"83vh",flex:1,display:"flex",width:screen<725?"100%":"",
    overflowX:screen<725?"auto":"",
    overflowY:screen<725?"":"auto", flexDirection: "column",}}>

<div style={{
  overflowY:"auto",
  height:screen<725?"":"83vh",padding:screen<725?"0 1rem 1rem 1rem":"1rem 2rem 1rem 2rem",width:"100%"}}>
<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
</div>

    </section>


   </div>
     
    
    </div>
  );
};

export default AdminProfile;
