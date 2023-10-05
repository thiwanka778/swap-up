import React, { useState } from "react";
import "./StaffSignup.css";
import { Input, Select } from "antd";
import { Radio, Space } from "antd";
import toast, { Toaster } from "react-hot-toast";
// import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getUserEmail, staffRegister } from "../../../redux/userSlice";
import { FaTimes } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import WarningToast from "../../../components/warningToast/WarningToast";
import { userRegister,resetUser } from "../../../redux/userSlice";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AiOutlineCheckCircle } from "react-icons/ai";
import {  Modal } from 'antd';

const validatePStyles = {
  color: "white",
  fontFamily: "'Ubuntu', sans-serif",
  fontWeight: 500,
  letterSpacing: "0.1rem",
  marginLeft: "0.3rem",
};





const pStyles = {
  fontSize: "1.2rem",
  fontFamily: "'Ubuntu', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.2rem",
  marginBottom: "0.6rem",
  marginTop: "2rem",
  color: "white",
  //  textShadow:"2px 2px 1px black",
};

const pStylesOnRagio={
  fontSize: "0.8rem",
  fontFamily: " 'Poppins', sans-serif",
  fontWeight: "500",
  letterSpacing: "0.2rem",
  color: "white",
}

const inputBoxStyles = {
  borderRadius: "4px",
  border: "1px solid #939599",
  boxShadow: "none",
  fontSize: "1rem",
  padding: "1rem",
  width: "100%",
  fontWeight: "500",
  fontFamily: " 'Poppins', sans-serif",
  letterSpacing: "0.1rem",
  // marginBottom: "1.5rem",
};

const inputBoxStylesGmail = {
  borderRadius: "4px",
  border: "1px solid #939599",
  boxShadow: "none",
  fontSize: "1rem",
  padding: "1rem",
  width: "100%",
  fontWeight: "500",
  fontFamily: " 'Poppins', sans-serif",
  letterSpacing: "0.1rem",
  color: "black",
  // marginBottom: "1.5rem",
};

const StaffSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEmail, screen,userLoading,userError,
    userRegisterStatus,staffRegisterStatus,
    userRegisterMessage } = useSelector((state) => state.user);
  const [gender, setGender] = React.useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNicValidate , setIsNicValidate]=React.useState(false);
  const [phoneNumberValidation, setPhoneNumberValidation] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    email:"",
    telephone:"",
  });
  const [nic, setNic] = React.useState("");
  const [userRole, setUserRole] = useState("INVENTORY_MANAGER");


  const handleFormChange = (event) => {
    const { name, value } = event.target;
    let newValue = "";
    if (name === "firstName" || name === "lastName" || name==="email" || name=="telephone") {
      newValue = value.trim();
    } else {
      newValue = value;
    }
    setForm((prevState) => {
      return { ...prevState, [name]: newValue };
    });
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const changeEmailClick = () => {
    dispatch(getUserEmail(""));
    navigate("/");
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newPassword = event.target.value;
    setConfirmPassword(newPassword);
  };

  const handleNicChange = (event) => {
    let value = event.target.value;

    value = value.replace(/[^0-9v]/gi, "");

    // Convert lowercase 'v' to uppercase 'V'
    value = value.replace(/v/g, "V");

    setNic(value);
  };
  const onChangeRole = (e) => {
   
    setUserRole(e.target.value);
  };

  

  React.useEffect(() => {
    const validateNIC = (nic) => {
      const nicRegex = /^(\d{9}[Vv]|\d{11})$/;

      if (nicRegex.test(nic)) {
        // console.log('Valid NIC');
        setIsNicValidate(true)
      } else {
        // console.log('Invalid NIC');
        setIsNicValidate(false)
      }
    };

    // Example usage
    validateNIC(nic);
   

  }, [nic]);

  let isPasswordMatch = false;

  if (confirmPassword !== "" && password !== "") {
    if (confirmPassword === password) {
      isPasswordMatch = true;
    } else {
      isPasswordMatch = false;
    }
  }

  const passwordValidation = {
    hasLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
  };

  React.useEffect(() => {
    
    // console.log(form.telephone)
     const phoneRegex = /^(0\d{9}|\+94\d{9}|[1-9]\d{8})$/;
  
    setPhoneNumberValidation(phoneRegex.test(form.telephone));
  }, [form.telephone]);

 

  const signUpClick=()=>{
// setIsModalOpen(true)
  const {firstName,lastName,address2,address,email,telephone}=form;
  const {hasLength,hasUpperCase,hasLowerCase,hasNumber,hasSpecialChar}=passwordValidation;

  if(firstName!=="" && telephone!=="" && phoneNumberValidation && address!==""&& email !==""  && password!=="" && confirmPassword!=="" && nic!=="" &&
  hasLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isPasswordMatch && isNicValidate){
    console.log("RUN SIGN UP FUNCTION")
     
    const formData = {
      email,
      firstName,
      lastName,
      telephone,
      address,
      nic,
      password,
      profilePicture:"",
      role:userRole,
    };

    console.log(formData)
   

    dispatch(staffRegister(formData))

  }else{

    if(firstName===""){
      toast.custom(<WarningToast message={"First name is required !"}/>)
      return ;
    }

if(nic===""){
  toast.custom(<WarningToast message={"NIC number is required !"}/>)
  return ;
}

if(nic!=="" && !isNicValidate){
  toast.custom(<WarningToast message={"Please provide valid NIC number !"}/>)
  return ;
}

    if(email==""){
      toast.custom(<WarningToast message={"Email is required !"}/>)
      return ;
    }


    if(telephone==""){
      toast.custom(<WarningToast message={"Phone number is required !"}/>)
      return ;
    }
    if(telephone!=="" && !phoneNumberValidation){
      toast.custom(<WarningToast message={"Enter valid phone number !"}/>)
      return ;
    }

    if(address==="" ){
      toast.custom(<WarningToast message={"At least one address is a must !"}/>)
      return ;
    }

   

    if(password===""){
      toast.custom(<WarningToast message={"Password is required !"}/>)
      return ;
    }

    if(password!=="" && (!hasLength || !hasSpecialChar || !hasLowerCase || !hasUpperCase || !hasNumber )){
      toast.custom(<WarningToast message={"Please provide valid password !"}/>)
      return ;
    }
    if(confirmPassword===""){
      toast.custom(<WarningToast message={"Confirm Password can't be empty !"}/>)
      return ;
    }
    if(confirmPassword!=="" && !isPasswordMatch){
      toast.custom(<WarningToast message={"Password and Confirm Password must match !"}/>)
      return ;
    }


  }

};

React.useEffect(()=>{
if(userLoading==false){
  if(staffRegisterStatus===true){
   
    setForm({ firstName: "",
    lastName: "",
    address: "",
    address2: "",
    email:"",
    telephone:"",})
    setPassword("");
    setConfirmPassword("");
    setNic("");
    setIsModalOpen(true);
    dispatch(resetUser())

  }
  // else if(userRegisterMessage=="this user name already exist"){
  //   console.log("user EXIST")
  //   toast.custom(<WarningToast message={"Email already exist !"}/>)
  // }
}
},[userLoading]);

  
const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
   
};




  return (
    <>
    <div className="sign-up2admin">
      <div className="main-signup-container">
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "2rem",
            textAlign:"center",
          }}
        >
          <p
            style={{
              fontFamily: "'Ubuntu', sans-serif",
              fontSize: "2.5rem",
              color: "white",
              fontWeight: "600",
              width: "fit-content",
              letterSpacing: "0.2rem",
              textShadow: "3px 3px 1px black",
            }}
          >
            Staff Registration
          </p>
          <p
            style={{
              fontFamily: "'Ubuntu', sans-serif",
              fontSize: "1.75rem",
              color: "white",
              marginTop: "1rem",
              fontWeight: "600",
              width: "fit-content",
              letterSpacing: "0.2rem",
              textShadow: "3px 3px 1px black",
            }}
          >
            Staff details to Complete the Registation
          </p>
        </div>
        <div className="input-box-container">
          <p style={pStyles}>First Name</p>
          <Input
            style={inputBoxStyles}
            placeholder="First Name"
            onChange={handleFormChange}
            name="firstName"
            value={form.firstName}
          />

          <p style={pStyles}>Last Name</p>
          <Input
            style={inputBoxStyles}
            placeholder="Last Name"
            onChange={handleFormChange}
            name="lastName"
            value={form.lastName}
          />

          <p style={pStyles}>NIC</p>
          <Input
            value={nic}
            onChange={handleNicChange}
            style={inputBoxStyles}
            placeholder="Natinal Identity Card Number"
          />
          {nic !== "" && (
            <div style={{ width: "100%", marginTop: "0.3rem" }}>
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                {isNicValidate === true ? (
                  <IoMdCheckmarkCircleOutline color="#41fc03" size={22} />
                ) : (
                  <FaTimes color="red" size={21} />
                )}
                <p style={validatePStyles}>
                  {isNicValidate === false
                    ? "Please enter a valid NIC !"
                    : "Valid NIC"}
                </p>
              </div>
            </div>
          )}

          <p style={pStyles}>Email</p>
          <Input
            style={inputBoxStylesGmail}
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
          />

<p style={pStyles}>Select user role</p>
<div>
<Radio.Group onChange={onChangeRole} value={userRole}>
       <Space direction="vertical">
      <Radio value={"INVENTORY_MANAGER"}><p style={pStylesOnRagio}>INVENTORY MANAGER</p></Radio>
      <Radio value={"QUALITY_CHECKER"}><p style={pStylesOnRagio}>QUALITY CHECKER</p></Radio>
      <Radio value={"HELP_ASSISTANT"}><p style={pStylesOnRagio}>HELP ASSISTANT</p></Radio>
      <Radio value={"ADMIN"}><p style={pStylesOnRagio}>ADMIN</p></Radio>
      </Space>
    </Radio.Group>
</div>


        

<p style={pStyles}>Phone Number</p>
          <Input
            style={inputBoxStylesGmail}
            placeholder="Phone Number"
            name="telephone"
            value={form.telephone}
            onChange={handleFormChange}
          />

{form.telephone !== "" && (
            <div style={{ width: "100%", marginTop: "0.3rem" }}>
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                {phoneNumberValidation === true ? (
                  <IoMdCheckmarkCircleOutline color="#41fc03" size={22} />
                ) : (
                  <FaTimes color="red" size={21} />
                )}
                <p style={validatePStyles}>
                  {phoneNumberValidation === false
                    ? "Please enter a valid phone number !"
                    : "Valid phone number"}
                </p>
              </div>
            </div>
          )}

          <p style={pStyles}>Address Line 01</p>
          <Input
            style={inputBoxStyles}
            placeholder="Address Line 01"
            onChange={handleFormChange}
            name="address"
            value={form.address}
          />

        


          <p style={pStyles}>Password</p>
          <Input.Password
            style={inputBoxStyles}
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
          {password !== "" && (
            <div style={{ width: "100%", marginTop: "0.3rem" }}>
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                {passwordValidation.hasLength === true ? (
                  <IoMdCheckmarkCircleOutline color="#41fc03" size={22} />
                ) : (
                  <FaTimes color="red" size={21} />
                )}
                <p style={validatePStyles}>At least 8 characters</p>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.1rem",
                }}
              >
                {passwordValidation.hasUpperCase === true ? (
                  <IoMdCheckmarkCircleOutline color="#41fc03" size={22} />
                ) : (
                  <FaTimes color="red" size={21} />
                )}
                <p style={validatePStyles}>At least one uppercase letter</p>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.1rem",
                }}
              >
                {passwordValidation.hasLowerCase === true ? (
                  <IoMdCheckmarkCircleOutline color="#41fc03" size={22} />
                ) : (
                  <FaTimes color="red" size={21} />
                )}
                <p style={validatePStyles}>At least one lowercase letter</p>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.1rem",
                }}
              >
                {passwordValidation.hasNumber === true ? (
                  <IoMdCheckmarkCircleOutline color="#41fc03" size={22} />
                ) : (
                  <FaTimes color="red" size={21} />
                )}
                <p style={validatePStyles}>At least one numeric digit</p>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.1rem",
                }}
              >
                {passwordValidation.hasSpecialChar === true ? (
                  <IoMdCheckmarkCircleOutline color="#41fc03" size={22} />
                ) : (
                  <FaTimes color="red" size={21} />
                )}
                <p style={validatePStyles}>
                  At least one special character (eg:@,#,$,...)
                </p>
              </div>
            </div>
          )}

          <p style={pStyles}>Confirm Password</p>
          <Input.Password
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            style={inputBoxStyles}
            placeholder="Confirm Password"
          />

          {confirmPassword !== "" && password !== "" && (
            <div style={{ width: "100%", marginTop: "0.3rem" }}>
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                {isPasswordMatch === true ? (
                  <IoMdCheckmarkCircleOutline color="#41fc03" size={22} />
                ) : (
                  <FaTimes color="red" size={21} />
                )}
                <p style={validatePStyles}>
                  {isPasswordMatch === false
                    ? "Passwords do not match !"
                    : "Passwords match"}
                </p>
              </div>
            </div>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <button className="submit-btn" onClick={signUpClick}>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>



    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          custom: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />


<Backdrop
        sx={{ color: 'blue',}}
        open={userLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      <Modal
       title="" 
       footer={null}
       open={isModalOpen} 
       onOk={handleOk} 
       centered={true}
       closable={false}
       zIndex={50000}
      
       >
         <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",
         flexDirection:"column"}}>
         <AiOutlineCheckCircle size={80} style={{ color: "green" }} />
           <p style={{fontSize:"1.5rem",letterSpacing:"0.1rem",color:"green",textAlign:"center",}}>
            Registered Successfully !
            </p>
            <p></p>
           {/* <button onClick={handleCancel} className="rs-modal-btn" style={{marginTop:"0.5rem"}}>OK</button> */}
           <button onClick={handleCancel} className="rs-modal-btn" style={{marginTop:"0.5rem"}}>OKAY</button>
         </div>
     
      </Modal>


    </>
  );
};

export default StaffSignup;
