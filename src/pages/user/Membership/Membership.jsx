import React from "react";
import "./Membership.css";
import GoldMembership from "./GoldMembership";
import PlatinumMembership from "./PlatinumMembership";
import DiamondMembership from "./DiamondMembership";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedDetail } from "../../../redux/userSlice";

const Membership = () => {
const dispatch=useDispatch();
const [color,setColor]=React.useState("");
const {openRedux,screen,user,
  paymentLoading ,
  createPaymentStatus,confirmPaymentStatus,subData}=useSelector((state)=>state.user);

  React.useEffect(()=>{
    if(user?.role==="CUSTOMER"){
      dispatch(getSubscribedDetail(user?.userId))
    }
  
  },[user])

  React.useEffect(()=>{
     if(subData && subData!=null && subData!="undefined" && subData!=undefined){
      if(subData?.subscribed){
        if(subData?.planName==="gold"){
          setColor("#FFD700")
        }else if(subData?.planName==="platinum"){
          setColor("#83848a")
        }else if(subData?.planName==="diamond"){
          setColor("#00BFFF")
        }
      }
     }
  },[subData]);

  

console.log(subData,color)
let containerStyles={};
if(screen>971){
  containerStyles={
    width:"100%",
    display:"flex",
    // alignItems:"center",
    justifyContent:"space-evenly",
    marginTop:"2.5rem",
    // paddingLeft:"1rem",
  }
}else if(screen>350){
  containerStyles={
    width:"100%",
    display:"grid",
    gridGap:"10px",
    marginTop:"2.5rem",
    gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
    paddingLeft:"1rem",
  }
 
}
// containerStyles= screen>712?{
//     width:"100%",
//     display:"grid",
//     gridGap:"10px",
//     marginTop:"2.5rem",
//     gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
//     paddingLeft:"1rem",
//   }:{
//     width:"100%",
//     display:"flex",
//     flexDirection:"column",
//     alignItems:"center",
//     justifyContent:"center",
//     marginTop:"2.5rem",
//   }

  return (

    <div className="membership" 
    style={{ paddingLeft: openRedux && screen > 650 ? "275px" : "1rem" }}>

       {!subData?.subscribed && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2rem"}}>

         <p style={{fontSize:"2rem",fontWeight:"bold",color:"#55059c",
         letterSpacing:"0.1rem",textAlign:"center"}}>UPGRADE YOUR ACCOUNT</p>
       </div>}


      {subData?.subscribed && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1rem"}}>
        <img 
        style={{width:"50px"}}
        src="https://www.doigandsmith.co.uk/wp-content/uploads/2020/02/tick-icon-symbol-green-checkmark-isolated-vector-24026516green.png"/>
         <p style={{fontSize:"1.5rem",fontWeight:"bold",
         letterSpacing:"0.1rem",textAlign:"center"}}>You have subscribed to <span style={{color:color,fontSize:"1.8rem",fontWeight:"bold"}}>{subData?.planName.toUpperCase()}</span> Membership from {subData?.createdDate?.slice(0,10)}</p>
       </div>}



      {subData?.subscribed && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",}}>
        
         <p style={{fontSize:"1rem",fontWeight:"bold",
         letterSpacing:"0.1rem",textAlign:"center"}}>Expired Date : {subData?.expiredDate.slice(0,10)}</p>
       </div>}

      <div style={containerStyles}>

        <GoldMembership {...subData}/>
       <PlatinumMembership {...subData}/>
        <DiamondMembership {...subData}/>

      </div>
    </div>
  );
};

export default Membership;
