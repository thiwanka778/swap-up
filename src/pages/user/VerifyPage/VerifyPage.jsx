import React from 'react';
import "./VerifyPage.css";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { resetUser,userVerify } from '../../../redux/userSlice';
import {useNavigate} from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {  Modal } from 'antd';

const VerifyPage = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    console.log(id)
    const dispatch=useDispatch();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const {userVerifyMessage,userVerifyStatus,userLoading}=useSelector((state)=>state.user);

    const verifyClick=()=>{
        if(id){
            dispatch(userVerify({verifyCode:id}))
        }
       
    };

    React.useEffect(()=>{
        if(userLoading==false){
            if(userVerifyStatus===true && userVerifyMessage=="Account Verified"){
                // console.log("user verified successfully !");
                dispatch(resetUser());
                setIsModalOpen(true);
                

            }
        }

    },[userLoading]);

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel=()=>{
      navigate("/login");
      setIsModalOpen(false);
    }

  return (
    <>
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

        <Modal
       title="" 
       footer={null}
       open={isModalOpen} 
       onOk={handleOk} 
       centered={true}
       closable={false}
      
       >
         <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",
         flexDirection:"column"}}>
         <AiOutlineCheckCircle size={80} style={{ color: "green" }} />
           <p style={{fontSize:"1.5rem",letterSpacing:"0.1rem",color:"green",textAlign:"center"}}>
            Account has been verified successfully !
            </p>
            {/* <p>Go and check your inbox</p> */}
           <button onClick={handleCancel} className="rs-modal-btn" style={{marginTop:"0.5rem"}}>Login</button>
         </div>
     
      </Modal>
        </>
  )
}

export default VerifyPage