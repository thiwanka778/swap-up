import React from 'react';
import "./PaymentCancel.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmPayment } from '../../../redux/userSlice';

const PaymentCancel = () => {
    const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    React.useEffect(()=>{
     if(user?.role==="CUSTOMER"){
        dispatch(confirmPayment(user?.userId))
     }
    },[user]);


  return (
    <div className="payment-success">
        <img src="https://static.vecteezy.com/system/resources/previews/017/172/374/original/warning-message-concept-represented-by-exclamation-mark-icon-exclamation-symbol-in-triangle-png.png" 
        style={{width:"200px",}}/>
     
      <p style={{fontSize:"2.5rem",fontWeight:"bold",letterSpacing:"0.1rem",textAlign:"center",
    fontFamily: "'Ubuntu', sans-serif",marginTop:"1rem"}}>Something went wrong...!</p>
        <p style={{fontSize:"1rem",fontWeight:"bold",letterSpacing:"0.1rem",textAlign:"center",
    fontFamily: "'Ubuntu', sans-serif",marginTop:"1rem"}}>Try again later.</p>

    <button className='start-swapping-error' style={{marginTop:"1.5rem"}}
    onClick={()=>navigate("/user-membership")}>Go Back</button>

    </div>
  );
};

export default PaymentCancel;
