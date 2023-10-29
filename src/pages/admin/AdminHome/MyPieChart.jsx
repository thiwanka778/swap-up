import React from 'react';
import { Pie } from 'react-chartjs-2';
import CircleIcon from '@mui/icons-material/Circle';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);



const MyPieChart = () => {
    const data = {
        labels: ['Gold Membership', 'Platinum Membership', 'Diamond Membership'],
        datasets: [
          {
            data: [200, 150, 100], // Replace with your data
            backgroundColor: ['#d4cd06', '#9a9ba1', '#04d9e0'], // Custom colors
            borderColor: ['#d4cd06', '#9a9ba1', '#04d9e0'], // Border colors
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
          <p style={{textAlign:"center",
          fontFamily:" 'Poppins', sans-serif",fontSize:"1.5rem"}}>How many subscribers ?</p>
        </div>


    <div style={{display:"flex",width:"fit-content"}}>
              <div style={{width:"300px"}}>
                     <Pie data={data} options={options} />
              </div>

              <div>
                   <div style={{display:"flex",alignItems:"center",marginBottom:"0.3rem"}}>
                    <CircleIcon  
                   style={{color:"#d4cd06",marginRight:"0.2rem",width:"fit-content"}}/>
                   <span style={{fontFamily: "'Ubuntu', sans-serif",
                   fontWeight:"bold",letterSpacing:"0.1rem",
                   fontSize:"1.2rem",color:"#d4cd06"}}>Gold Membership</span></div>

               <div style={{display:"flex",alignItems:"center",marginBottom:"0.3rem"}}><CircleIcon  
                   style={{color:"#9a9ba1",marginRight:"0.2rem",width:"fit-content"}}/>
                   <span style={{fontFamily: "'Ubuntu', sans-serif",
                   fontWeight:"bold",letterSpacing:"0.1rem",
                   fontSize:"1.2rem",color:"#9a9ba1"}}>Platinum Membership</span></div>


             <div style={{display:"flex",alignItems:"center",marginBottom:"0.3rem"}}><CircleIcon  
                   style={{color:"#04d9e0",marginRight:"0.2rem",width:"fit-content"}}/>
                   <span style={{fontFamily: "'Ubuntu', sans-serif",
                   fontWeight:"bold",letterSpacing:"0.1rem",fontSize:"1.2rem",color:"#04d9e0"}}>Diamond Membership</span></div>

              </div>
  
    </div>
    </div>
  
  );
};

export default MyPieChart;

