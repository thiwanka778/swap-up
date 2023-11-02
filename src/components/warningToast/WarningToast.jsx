import React from 'react';
import { MdWarning } from 'react-icons/md';

const WarningToast = ({message}) => {
  return (
    <div style={{display:"flex",alignItems:"center",background:"#fa560a",
    borderRadius:"8px",padding:"0.5rem",zIndex:"40000000000",marginTop:"15vh"}}>
        <MdWarning size={21} color="white" />
        <p style={{color:"white",marginLeft:"0.5rem",
        fontFamily:" 'Poppins', sans-serif",
        fontSize:"1rem",letterSpacing:"2px",fontWeight:500}}>{message}</p>
        </div>
  )
}

export default WarningToast;