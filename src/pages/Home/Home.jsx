import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import toast, { Toaster } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import WarningToast from "../../components/warningToast/WarningToast";
import { getUserEmail } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import Slider from "../../components/Slider/Slider";
import Card from "../../components/Card/Card";
import cardArray from "../../components/Card/cardArray";
import { useTypewriter,Cursor } from "react-simple-typewriter";
// import { useTypewriter } from 'react-typewriter-hook';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {screen}=useSelector((state)=>state.user);

  const cardDisplayStyles=screen>460?{
    width: "100%",
    padding: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px, 1fr))",
  }:{
     width:"100%",
     display:"flex",
     flexDirection:"column",
     alignItems:"center",
     padding:"1rem",
  }

  console.log(cardArray);
  const cardDisplay = cardArray.map((item) => {
    return <Card key={item.id} {...item} />;
  });


  const [typeEffect]=useTypewriter({
    words:[
      "Discover the Benefits of Dress Swapping",
      "Swap Dresses, Save Money, and Embrace Sustainability",
      "Unlock Your Fashion Potential with Dress Swaps",
      "Connect, Engage, and Refresh Your Wardrobe with Dress Swaps",
      "Convenience and Style: Explore Dress Swapping",
      "Personalized Fashion Experiences with Dress Swaps",
      "Make Informed Fashion Choices through Feedback and Ratings",
      "Elevate Your Wardrobe: Sustainable Rotation and Style Updates",
      "Stay Inspired, Stay Trendy: Fashion Inspiration and Trends",
      "Customer Support for a Seamless Dress Swapping Experience",
    ],
   loop:{},
    typeSpeed:100,
    deleteSpeed:30,

  })

  
console.log(typeEffect)
  return (
    <>
      <div className="home">

        <div style={{ width: "100%" }}>
          <Slider />
        </div>

        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1.4rem",padding:"0 1rem 0 1rem"}}>
     <p style={{color:"#021e4a",fontSize:"3rem",fontFamily: "'Ubuntu', sans-serif",fontWeight:"500"}}>{typeEffect}</p>
        </div>

        <div
          style={cardDisplayStyles}
        >
          {cardDisplay}
        </div>
      </div>
    </>
  );
};

export default Home;
