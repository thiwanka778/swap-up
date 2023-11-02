import React from 'react';
import { Pie } from 'react-chartjs-2';
import CircleIcon from '@mui/icons-material/Circle';
import { useSelector,useDispatch } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAdminDashboardData } from '../../../redux/adminSlice';
ChartJS.register(ArcElement, Tooltip, Legend);



const MyPieChart = () => {

  const dispatch=useDispatch();
  const {adminData,adminLoading}=useSelector((state)=>state.admin);

  React.useEffect(()=>{
    dispatch(getAdminDashboardData());
 },[]);
    const data = {
        labels: ['Gold Membership', 'Platinum Membership', 'Diamond Membership'],
        datasets: [
          {
            data: [adminData?.totalGoldMembership/4.99   , adminData?.platinumMembership/9.99 ,adminData?.diamondMembership/19.99], // Replace with your data
            backgroundColor: ['#f7ff0a', '#9a9ba1', '#04d9e0'], // Custom colors
            borderColor: ['#f7ff0a', '#9a9ba1', '#04d9e0'], // Border colors
            borderWidth: 1,
          },
        ],
      };

      const options = {
        plugins: {
          legend: {
            display: false, // Disable the legend (labels on top of the chart)
          },
        },
      };

  return (
    <div style={{width:"fit-content"}}>

        <div style={{width:"100%",marginBottom:"0.8rem"}}>
          <p style={{textAlign:"center",fontWeight:"bold",letterSpacing:"0.1rem",
          fontFamily:" 'Poppins', sans-serif",fontSize:"1.2rem"}}>How many subscribers ?</p>
        </div>


    <div style={{display:"flex",width:"fit-content",}}>
              <div style={{width:"250px",}}>
                     <Pie data={data} options={options} />
              </div>

              <div>
                   <div style={{display:"flex",alignItems:"center",marginBottom:"0.3rem"}}>
                    <CircleIcon  
                   style={{color:"#d4cd06",marginRight:"0.2rem",width:"fit-content"}}/>
                   <span style={{fontFamily: "'Ubuntu', sans-serif",
                   fontWeight:"bold",letterSpacing:"0.1rem",
                   fontSize:"1rem",}}>Gold Membership</span></div>

               <div style={{display:"flex",alignItems:"center",marginBottom:"0.3rem"}}><CircleIcon  
                   style={{color:"#9a9ba1",marginRight:"0.2rem",width:"fit-content"}}/>
                   <span style={{fontFamily: "'Ubuntu', sans-serif",
                   fontWeight:"bold",letterSpacing:"0.1rem",
                   fontSize:"1rem",}}>Platinum Membership</span></div>


             <div style={{display:"flex",alignItems:"center",marginBottom:"0.3rem"}}><CircleIcon  
                   style={{color:"#04d9e0",marginRight:"0.2rem",width:"fit-content"}}/>
                   <span style={{fontFamily: "'Ubuntu', sans-serif",
                   fontWeight:"bold",letterSpacing:"0.1rem",fontSize:"1rem",}}>Diamond Membership</span></div>

              </div>
  
    </div>
    </div>
  
  );
};

export default MyPieChart;

