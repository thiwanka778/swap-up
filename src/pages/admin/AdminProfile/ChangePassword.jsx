import React,{useState} from 'react';
import "./AdminProfile.css";
import { Input } from 'antd';
import { FaTimes } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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
  
  };
  const validatePStyles = {
    color: "black",
    fontFamily: "'Ubuntu', sans-serif",
    fontWeight: 500,
    letterSpacing: "0.1rem",
    marginLeft: "0.3rem",
  };

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
      };
    
      const handleConfirmPasswordChange = (event) => {
        const newPassword = event.target.value;
        setConfirmPassword(newPassword);
      };

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

  return (
    <div>
   
   <p className='p-styles' >New Password</p>

   <Input.Password className='input-styles' placeholder='Enter New Password'
    onChange={handlePasswordChange} value={password}/>
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

   <p className='p-styles' style={{marginTop:"1.5rem"}}>Confirm New Password</p>

   <Input.Password className='input-styles' placeholder='Confirm New Password'
   onChange={handleConfirmPasswordChange} value={confirmPassword} />
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

          <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"1.5rem"}}>
   <button className='p-edit-btn' >Save changes</button>
          </div>


    </div>
  )
}

export default ChangePassword