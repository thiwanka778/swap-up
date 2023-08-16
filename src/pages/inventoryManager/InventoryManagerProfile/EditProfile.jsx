import React from 'react';
import "./InventoryManagerProfile.css";
import { Input } from 'antd';

const pStyles={
    fontSize: "1.2rem",
    fontFamily: "'Ubuntu', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.1rem",
  };

  const inputStyles={
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    boxShadow: 'none',
    fontSize: '1rem',
    padding: '1rem',
    width: "100%",
    fontWeight:"500",
     fontFamily:" 'Poppins', sans-serif",
     letterSpacing:"0.1rem",
     marginBottom:"1.5rem",
  
  }

const EditProfile = () => {

  return (
    <div>
<p style={pStyles}>First Name</p>
<Input style={inputStyles} value={"Ron"}/>

<p style={pStyles}>Last Name</p>
<Input style={inputStyles} value={"James"}/>

<p style={pStyles}>Address Line 01</p>
<Input style={inputStyles} value={"46 Gates Lane Bethesda, MD 20814"}/>

<p style={pStyles}>Address Line 02</p>
<Input style={inputStyles} value={""}/>

<p style={pStyles}>NIC</p>
<Input style={inputStyles} value={"123778458"}/>

<p style={pStyles}>Phone Number</p>
<Input style={inputStyles} value={"77456676"}/>

<div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
    <button className='r-edit-btn' style={{marginRight:"1rem"}}>Reset</button>
<button className='p-edit-btn'>Save changes</button>
</div>

        
    </div>
  )
}

export default EditProfile