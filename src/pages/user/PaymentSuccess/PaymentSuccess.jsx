import React from 'react';
import "./PaymentSuccess.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmPayment } from '../../../redux/userSlice';

const PaymentSuccess = () => {
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
        <img src="https://ontariochristiancamp.ca/wp-content/uploads/2021/05/success-green-check-mark.png" 
        style={{width:"200px",}}/>
     
      <p style={{fontSize:"2.5rem",fontWeight:"bold",letterSpacing:"0.1rem",textAlign:"center",
    fontFamily: "'Ubuntu', sans-serif",marginTop:"1rem"}}>Thank you for your payment...!</p>

    <button className='start-swapping' style={{marginTop:"1.5rem"}}
    onClick={()=>navigate("/")}>Start Swapping</button>

    </div>
  );
};

export default PaymentSuccess;
