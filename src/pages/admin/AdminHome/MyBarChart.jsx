import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDispatch,useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getAdminDashboardData } from '../../../redux/adminSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBarChart=()=>{
  const dispatch=useDispatch();
  const {adminData,adminLoading}=useSelector((state)=>state.admin);

  React.useEffect(()=>{
    dispatch(getAdminDashboardData());
 },[]);


    const membershipLabels = ['Gold', 'Platinum', 'Diamond'];
    const earningsData = [adminData?.totalGoldMembership  , adminData?.platinumMembership ,adminData?.diamondMembership ];
    const backgroundColors = ['#f7ff0a', '#b0b0bf', '#16f1f5'];
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display: false, 
          },
          title: {
            display: true,
            text: '',
          },
        },
      };
      const data = {
        labels: membershipLabels,
        datasets: [
          {
           label: '',
            data: earningsData,
            backgroundColor: backgroundColors,
            showLine: false, // You can customize the color
          },
        ],
      };
    return (
        <div style={{width:"500px"}}>
            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
               <p style={{fontSize:"1.2rem",letterSpacing:"0.1rem",
               fontWeight:"bold",fontFamily:" 'Poppins', sans-serif"}}>Membership Earnings ($)</p>
            </div>
           <Bar options={options} data={data} />
        </div>
        
    )
}

export default MyBarChart;