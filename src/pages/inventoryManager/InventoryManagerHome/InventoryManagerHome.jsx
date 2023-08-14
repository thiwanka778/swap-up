import React, { useEffect, useState } from "react";
import "./InventoryManagerHome.css";
import { useSelector,useDispatch } from "react-redux";
import CountUp from 'react-countup';
// Import Swiper styles
import 'swiper/css';





function formatDate(date) {
    const day = date.getDate();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  function getDayOfWeek(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
  }

const InventoryManagerHome = () => {
  const carouselRef = React.useRef(null);

    const {screen}=useSelector((state)=>state.user)
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // const interval = setInterval(() => {
          setCurrentDate(new Date());
        // }, 1000); 
    
        // return () => clearInterval(interval);
      }, []);
    
      const formattedDate = formatDate(currentDate);
      const dayOfWeek = getDayOfWeek(currentDate);

      
      

  return (
    
    <div className='inventory-manager-home'>

       <div style={{width:"100%",display:"flex",
       alignContent:"center",
       justifyContent:"flex-end",}}>
          <p style={{fontFamily:" 'Poppins', sans-serif",fontSize:"1.2rem",
          fontWeight:600,letterSpacing:"0.1rem",color:"#00425A",}}>{formattedDate}</p>
       </div>

       <div style={{width:"100%",display:"flex",
       alignContent:"center",
       justifyContent:"flex-end",}}>
          <p style={{fontFamily:" 'Poppins', sans-serif",
          fontSize:"0.8rem",fontWeight:600,letterSpacing:"0.1rem"}}>{dayOfWeek}</p>
       </div>



       <div style={{width:"100%",display:"flex",alignItems:"center",
       justifyContent:"center",flexDirection:screen<485?"column":"row"}}>

        <div style={{display:"flex",alignItems:"center",marginRight:screen<485?"0rem":"2rem",
        marginBottom:screen<485?"1.5rem":"0rem",
        padding:"1rem",boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        justifyContent:"center",flexDirection:"column",background:"#d3d3db",borderRadius:"10px"}}>
            <p style={{fontFamily: "'Inter', sans-serif",fontSize:"2rem",color:"#00425A",fontWeight:500}}>Total Checked</p>
            <p style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}} >
                <span>
               <i className="bi-file-text" style={{fontSize:"1.5rem"}}></i>
                    </span> 
                <span style={{fontFamily: "'Inter', sans-serif",fontSize:"30px",display:"flex",
                alignItems:"center",
                color:"#00425A",fontWeight:500,marginLeft:"0.5rem"}}>
                <CountUp
          start={0}
          end={85}
          duration={3}
          style={{ fontSize: '2rem', }} 
        /> 
                </span>
                </p>
        </div>


        <div style={{display:"flex",alignItems:"center",
        padding:"1rem",boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        justifyContent:"center",flexDirection:"column",background:"#d3d3db",borderRadius:"10px"}}>
            <p style={{fontFamily: "'Inter', sans-serif",fontSize:"2rem",color:"#00425A",fontWeight:500}}>Total Collection</p>
            <p style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}} >
                <span>
               <i className="bi-file-earmark-bar-graph" style={{fontSize:"1.5rem"}}></i>
                    </span> 
                <span style={{fontFamily: "'Inter', sans-serif",fontSize:"2rem",color:"#00425A",display:"flex",
                alignItems:"center",
                fontWeight:500,marginLeft:"0.5rem"}}>
                    <CountUp
          start={0}
          end={70}
          duration={3}
          style={{ fontSize: '2rem', }} 
        /> 
                </span>
                </p>
        </div>

       </div>

       {/* text slider start */}



      
        </div>
  )
}

export default InventoryManagerHome;
