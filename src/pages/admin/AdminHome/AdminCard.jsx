import React from 'react';
import "./AdminHome.css";
import { useSelector } from 'react-redux';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CountUp from "react-countup";


const AdminCard = (props) => {
    const {screen}=useSelector((state)=>state.user);
    
  return (
    <div className='admin-card' style={{height:"100px",padding:"1rem"}}>
         <div style={{width:"100%",alignItems:"center",justifyContent:"space-between",display:"flex"}}>
           <p className='admin-card-main-text'>{props.title}</p>
           {props.icon}
         </div>


         <div style={{display:"flex",alignItems:"center"}}>

            {props.prefix && <p style={{marginRight:"0.5rem",fontSize:"2rem",
            fontFamily: "'Inter', sans-serif",
            fontWeight:"bold",color:"#86888f"}}>{props.prefixValue}</p>}

       { props.d===false ? <CountUp
         style={{fontSize:"2rem",fontFamily: "'Inter', sans-serif",fontWeight:"bold",color:"#86888f"}}
  start={0}
  end={props.count}
  duration={2.75}
 ></CountUp>: <p style={{fontSize:"2rem",fontFamily: "'Inter', sans-serif",fontWeight:"bold",color:"#86888f"}}>
  {props?.count?.toFixed(2)}
  </p>}
         </div>
      

    </div>
  )
}

export default AdminCard