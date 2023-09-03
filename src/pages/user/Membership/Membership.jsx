import React from "react";
import "./Membership.css";
import GoldMembership from "./GoldMembership";
import PlatinumMembership from "./PlatinumMembership";
import DiamondMembership from "./DiamondMembership";
import { useSelector } from "react-redux";

const Membership = () => {

const {openRedux,screen}=useSelector((state)=>state.user);

let containerStyles={}
if(openRedux===false && screen<953){
  containerStyles={
    width:"100%",
    display:"grid",
    gridGap:"10px",
    marginTop:"2.5rem",
    gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
    paddingLeft:"1rem",
  }
}else if(openRedux===false && screen>=953){
  containerStyles={
    width:"100%",
    display:"flex",
    justifyContent:"space-evenly",
    marginTop:"2.5rem",
  }
}else if(openRedux===true && screen>1120){
  containerStyles={
    width:"100%",
    display:"flex",
    justifyContent:"space-evenly",
    marginTop:"2.5rem",
  }
}
else if(openRedux===true && screen<=1120){
  containerStyles={
    width:"100%",
    display:"grid",
    gridGap:"10px",
    marginTop:"2.5rem",
    gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
    paddingLeft:"1rem",
  }
}
  return (

    <div className="membership" 
    style={{ paddingLeft: openRedux && screen > 650 ? "275px" : "1rem" }}>

       <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2rem"}}>

         <p style={{fontSize:"2rem",fontWeight:"bold",color:"#55059c",
         letterSpacing:"0.1rem",textAlign:"center"}}>UPGRADE YOUR ACCOUNT</p>
       </div>

      <div style={containerStyles}>

        <GoldMembership/>
       <PlatinumMembership/>
        <DiamondMembership/>

      </div>
    </div>
  );
};

export default Membership;
