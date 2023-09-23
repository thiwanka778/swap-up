import React from "react";
import "./SideBar.css";
import SideBarItem from "./SideBarItem";
import sideBarData2 from "./sideBarData2.js";
import sideBarDataQC from "./sideBarDataQC";
import swaplogo from "../../assets/swaplogo.png";
import { closeSideBarRedux, userLogout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import sideBarDataAdmin from "./sideBarDataAdmin";
import sideBarDataInventoryManager from "./sideBarDataInventoryManager";
import sideBarDataHelp from "./sideBarDataHelp";

const SideBar = ({openSideBar, setOpenSideBar }) => {
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.user);
  const [sideBarData,setSiderBarData]=React.useState(sideBarData2);

React.useEffect(()=>{
  setSiderBarData((prevState)=>{
     if(user?.role?.toLowerCase()=="customer"){
      return sideBarData2;
     }else if(user?.role?.toLowerCase()=="quality_checker"){
      return sideBarDataQC;
     }else if(user?.role==="admin"){
      return sideBarDataAdmin;
     }else if(user?.role?.toLowerCase()==="inventory_manager"){
      return sideBarDataInventoryManager;
     }else if(user?.role?.toLowerCase().trim()==="help_assistant"){
      return sideBarDataHelp;
     }
  })
},[user])
  


  const sidebaritemdisplay = sideBarData?.map((item, index) => {
    return <SideBarItem key={index} item={item} />;
  });

  const sideBarClose=()=>{
    dispatch(closeSideBarRedux())
    setOpenSideBar((prevState)=>{
return !prevState;
    })
  };



  React.useEffect(()=>{
    window.localStorage.setItem("openSideBar",JSON.stringify(openSideBar))
      },[openSideBar])

  return (
  <div  className="sidebar"

  >
    {/* <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"1rem 1rem 0 0"}}>
    <i className="bi-x-circle" style={{fontSize:"1rem",cursor:"pointer"}} onClick={sideBarClose} ></i>
    </div> */}

    <div style={{width:"100%",padding:"1rem",display:"flex",alignItems:"center",}}>
    <img src={swaplogo} style={{marginRight:"auto",width:"80px"}}/>
    <p style={{
         marginRight:"0.8rem",
    fontFamily: "'Satisfy', cursive",fontSize:"2.2rem"}}>Swap Up</p>
    </div>

    <div style={{marginTop:"2rem"}}>
    {sidebaritemdisplay}
    </div>

    <div  className="sidebar-item" style={{cursor:"pointer"}} onClick={()=>dispatch(userLogout())}>
          <span>
            <i
              style={{ fontSize: '1.2rem', textDecoration: 'none', color: 'white' }}
              className="bi-power"
            ></i>
          </span>

          <p className="item-title" style={{ textDecoration: 'none', color: 'white' }}>
            Logout
          </p>
        
        </div>
    
    </div>
    )
};

export default SideBar;
