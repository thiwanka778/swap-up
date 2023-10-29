import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import { useSelector, useDispatch } from "react-redux";
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import PendingIcon from '@mui/icons-material/Pending';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// Import Swiper styles
import "swiper/css";
import AdminCard from "./AdminCard";
import MyPieChart from "./MyPieChart";

function formatDate(date) {
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function getDayOfWeek(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

const AdminHome = () => {
  const carouselRef = React.useRef(null);

  const { screen, openRedux } = useSelector((state) => state.user);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const formattedDate = formatDate(currentDate);
  const dayOfWeek = getDayOfWeek(currentDate);

  return (
    <div className="admin-home" 
    style={{ paddingLeft: openRedux && screen > 650 ? "270px" : "1rem" }}>
      {/* <div style={{width:"100%",display:"flex",
       alignContent:"center",
       justifyContent:"flex-end",}}>
          <p style={{fontFamily:" 'Poppins', sans-serif",fontSize:"1.2rem",
          fontWeight:600,letterSpacing:"0.1rem",color:"#00425A",}}>{formattedDate}</p>
       </div> */}

      {/* <div style={{width:"100%",display:"flex",
       alignContent:"center",
       justifyContent:"flex-end",}}>
          <p style={{fontFamily:" 'Poppins', sans-serif",
          fontSize:"0.8rem",fontWeight:600,letterSpacing:"0.1rem"}}>{dayOfWeek}</p>
       </div> */}

      

      <div className="admin-container">
      <AdminCard 
         title="Total Requests"
         icon={<BakeryDiningIcon style={{fontSize:"28px",color:"#2749f5"}}/>}
         count={120}
         prefix={false}
      />

     <AdminCard 
         title="Accepted Requests"
         icon={<CheckCircleIcon style={{fontSize:"28px",color:"#6ce813"}}/>}
         count={87}
         prefix={false}
      />

       <AdminCard 
         title="Rejected Requests"
         icon={<DoDisturbOnIcon  style={{fontSize:"28px",color:"#ad360a"}}/>}
         count={10}
         prefix={false}
      />

       <AdminCard 
         title="Pending Requests"
         icon={<PendingIcon  style={{fontSize:"28px",color:"#f2b313"}}/>}
         count={23}
         prefix={false}
      />

       <AdminCard 
         title="Total Swaps"
         icon={<AutorenewIcon  style={{fontSize:"28px",color:"#a205e6"}}/>}
         count={45}
         prefix={false}
      />

       <AdminCard 
         title="Received Items"
         icon={<CheckroomIcon  style={{fontSize:"28px",color:"#db045e"}}/>}
         count={78}
         prefix={false}
      />

      <AdminCard 
         title="Total Customers"
         icon={<GroupIcon style={{fontSize:"28px",color:"#1f732a"}}/>}
         count={248}
         prefix={false}
      />

       <AdminCard 
         title="Total Profit"
         icon={<MonetizationOnIcon style={{fontSize:"28px",color:"#bfbf02"}}/>}
         count={420}
         prefix={true}
         prefixValue="Rs."
      />
   
      </div>

      <div style={{marginTop:"1rem"}}>
       <MyPieChart/>
      </div>


    </div>
  );
};

export default AdminHome;
