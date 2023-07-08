import React from 'react';
import { MdWarning } from 'react-icons/md';

const WarningToast = ({message}) => {
  return (
    <div style={{display:"flex",alignItems:"center",background:"#fa560a",borderRadius:"8px",padding:"0.8rem"}}>
        <MdWarning size={25} color="white" />
        <p style={{color:"white",marginLeft:"1rem",
        fontFamily:" 'Poppins', sans-serif",
        fontSize:"1.2rem",letterSpacing:"2px",fontWeight:500}}>{message}</p>
        </div>
  )
}

export default WarningToast;