import React from 'react';
import "./Profile.css";
import VerifiedIcon from '@mui/icons-material/Verified';
import Rating from '@mui/material/Rating';
import Input from 'antd/es/input/Input';
import EditIcon from '@mui/icons-material/Edit';


const pStyles = {
    fontSize: "1rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.1rem",
   
  };


const inputStyles={
    
        borderRadius: '4px',
        border: '1px solid #d9d9d9',
        boxShadow: 'none',
        fontSize: '1rem',
        padding: '1rem',
        fontWeight:"500",
         fontFamily:" 'Poppins', sans-serif",
         letterSpacing:"0.1rem",
      
      
}








const Profile = () => {




 return (
    <div className='profile'>
        
<div className='profile-container' style={{width:"100%",
display:"flex",alignItems:"center",justifyContent:"center"}}>

<section style={{width:"500px",display:"flex",
alignItems:"center",justifyContent:"center",padding:"20px",}}>

    <div style={{width:"360px",display:"flex",alignItems:"center",
    flexDirection:"column",background:"#e8eaed",
    borderRadius:"8px",padding:"2rem",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
    }}>

      <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" 
      alt="profile" style={{borderRadius:"50%",width:"200px",height:"200px"}} />

      <p style={{color:"#00425A",
      fontWeight:"bold",
      fontSize:"1.5rem",
      fontFamily: "'Inter', sans-serif",marginTop:"1rem"}}>Mr. Ron James</p>

<p style={{color:"#00425A",
      fontWeight:"500",
      fontSize:"1.2rem",
      fontFamily: "'Inter', sans-serif",marginTop:"0.5rem"}}>Member</p>

      <div style={{display:"flex",alignItems:"center",justifyContent:"center",
      padding:"8px 16px",background:"#04bf1d",borderRadius:"8px",marginTop:"1rem",}}>
        <VerifiedIcon sx={{color:"white",fontSize:"1.5rem"}}/> 
        <p style={{color:"white",fontSize:"1.2rem",
      fontFamily: "'Inter', sans-serif",
        fontWeight:"bold",letterSpacing:"0.1rem",marginLeft:"0.5rem"}}>Verified</p>
        </div>

        <p style={{color:"#00425A",
      fontWeight:"500",
      fontSize:"1rem",
      fontFamily: "'Inter', sans-serif",marginTop:"1.5rem"}}>120 Rates</p>

      <div style={{marginTop:"0.5rem"}}>
      <Rating  defaultValue={3} precision={0.5} readOnly 
            sx={{
                '& .MuiRating-iconFilled, & .MuiRating-iconEmpty': {
                  fontSize: 30,
                },
              }}
    
       />
      </div>

    </div>

</section>

<section style={{width:"100%",display:"flex",
alignItems:"center", paddingLeft:"5rem", paddingRight:"5rem",
 overflowY:"auto",maxHeight:"80vh",
}}>

    <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column",
    justifyContent:"center",marginTop:"60vh",}}>

        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>First Name</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn" style={{marginLeft:"1.5rem"}} >Edit</button>
                </div>
        </div>


        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>Last Name</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn" style={{marginLeft:"1.5rem"}}>Edit</button>
                </div>
        </div>



        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>NIC</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn"  style={{marginLeft:"1.5rem"}}>Edit</button>
                </div>
        </div>


        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>Address Line 01</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn"  style={{marginLeft:"1.5rem"}} >Edit</button>
                </div>
        </div>




        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>Address Line 02</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn"  style={{marginLeft:"1.5rem"}}>Edit</button>
                </div>
        </div>




        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>first Name</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn"  style={{marginLeft:"1.5rem"}}>Edit</button>
                </div>
        </div>




        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>first Name</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn"  style={{marginLeft:"1.5rem"}}>Edit</button>
                </div>
        </div>



        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>first Name</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn"  style={{marginLeft:"1.5rem"}}>Edit</button>
                </div>
        </div>



        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>first Name</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn"  style={{marginLeft:"1.5rem"}}>Edit</button>
                </div>
        </div>





        <div style={{display:"flex",flexDirection:"column",width:"100%"}} >
            <p style={pStyles}>first Name</p>
            <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
                <Input className='input-styles' value={'Thiwanka'} 
                disabled={true} style={{width:"400px",marginBottom:"1rem"}}  />
              <button className="p-edit-btn"  style={{marginLeft:"1.5rem"}}>Edit</button>
                </div>
        </div>




    </div>
   
</section>

</div>
      

        </div>
  )
}

export default Profile