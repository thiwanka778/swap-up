import React from "react";
import "./SideBar.css";
import SideBarItem from "./SideBarItem";
import sideBarData from "./sideBarData.js";
import swaplogo from "../../assets/swaplogo.png"

const SideBar = ({openSideBar,setOpenSideBar}) => {
  
  const sidebaritemdisplay = sideBarData.map((item, index) => {
    return <SideBarItem key={index} item={item} />;
  });

  const sideBarClose=()=>{
    setOpenSideBar((prevState)=>{
return !prevState;
    })
  };



  React.useEffect(()=>{
    window.localStorage.setItem("openSideBar",JSON.stringify(openSideBar))
      },[openSideBar])

  return (
  <div  className="sidebar">
    <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"1rem 1rem 0 0"}}>
    <i className="bi-x-circle" style={{fontSize:"1rem",cursor:"pointer"}} onClick={sideBarClose} ></i>
    </div>

    <div style={{width:"100%",padding:"1rem",display:"flex",alignItems:"center",}}>
    <img src={swaplogo} style={{marginRight:"auto",width:"80px"}}/>
    <p style={{
         marginRight:"0.8rem",
    fontFamily: "'Satisfy', cursive",fontSize:"2.2rem"}}>Swap Up</p>
    </div>

    <div style={{marginTop:"2rem"}}>
    {sidebaritemdisplay}
    </div>
    
    </div>
    )
};

export default SideBar;
