import React from 'react';
import "./VerifyPage.css";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { resetUser,userVerify } from '../../../redux/userSlice';

const VerifyPage = () => {
    const {id}=useParams();
    console.log(id)
    const dispatch=useDispatch();
    const {userVerifyMessage,userVerifyStatus,userLoading}=useSelector((state)=>state.user);

    const verifyClick=()=>{
        if(id){
            dispatch(userVerify({verifyCode:id}))
        }
       
    };

    React.useEffect(()=>{
        if(userLoading==false){
            if(userVerifyStatus===true){
                console.log("user verified successfully !");
                dispatch(resetUser());
            }
        }

    },[userLoading])

  return (
    <div className='verify-page-main'>
        <div className='verify-page'>
        <div className='verification-text'>
        <h1>Account Verification</h1>
        <p>Please click the button below to activate your account</p>
      </div>
      <div className='verification-button'>
        <button className='verify-button' onClick={verifyClick}>Verify Account</button>
      </div>
        </div>
          
        </div>
  )
}

export default VerifyPage