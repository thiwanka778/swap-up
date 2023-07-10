import React from "react";
import "./SignUp2.css";
import { Input, Select } from "antd";
import { Radio } from "antd";
// import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getUserEmail } from "../../redux/userSlice";
import SideBar from "../../components/SideBar/SideBar";



const plainOptions = ["Sinhala", "Tamil", "English"];

const options = [
  {
    value: "Select your gender",
    label: "Select your gender",
    disabled: true,
  },
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

const pStyles = {
  fontSize: "1.2rem",
  fontFamily: "'Ubuntu', sans-serif",
  fontWeight: "500",
  letterSpacing: "0.2rem",
  marginBottom: "0.6rem",
  marginTop: "2rem",
 color:"white",

};

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
  color:"white",
  // marginBottom: "1.5rem",
};

const SignUp2 = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const {userEmail,screen}=useSelector((state)=>state.user);
  const [gender, setGender] = React.useState("");
  const onChangeGender = (e) => {
    console.log("radio checked", e.target.value);
    setGender(e.target.value);
  };


  const changeEmailClick=()=>{
    dispatch(getUserEmail(""));
    navigate("/")
  }

  console.log("gender", gender);

  return (
    <div className="sign-up2">


<div style={{width:"100%"}}>
<SideBar/>
</div>

      <div className="main-signup-container">

      <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection:'column',
              marginBottom:"2rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Ubuntu', sans-serif",
                fontSize: "2.5rem",
                color: "white",
                fontWeight: "600",
                width:"fit-content",
                letterSpacing:"0.2rem",
                textShadow:"3px 3px 1px black",
              }}
            >
              Register To Become A Member
            </p>
            <p
              style={{
                fontFamily: "'Ubuntu', sans-serif",
                fontSize: "1.75rem",
                color: "white",
                fontWeight: "500",
                marginTop: "1rem",
                fontWeight: "600",
                width:"fit-content",
                letterSpacing:"0.2rem",
                textShadow:"3px 3px 1px black",
              }}
            >
             We Need Your Details To Complete Your Registration. 
            </p>
          </div>
        <div className="input-box-container">
         

          <p style={pStyles}>First Name</p>
          <Input style={inputBoxStyles} placeholder="First Name" />

          <p style={pStyles}>Last Name</p>
          <Input style={inputBoxStyles} placeholder="Last Name" />

          <p style={pStyles}>NIC</p>
          <Input
            style={inputBoxStyles}
            placeholder="Natinal Identity Card Number"
          />

          <p style={pStyles}>Gmail</p>
          <Input value={userEmail} disabled style={inputBoxStylesGmail}  placeholder="Gmail" />
          <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"0.3rem"}}>
          <p onClick={changeEmailClick} style={{color:"white",fontFamily: "'Ubuntu', sans-serif",fontSize:"1rem",cursor:"pointer"}}>change gmail</p>
          </div>

          <p style={pStyles}>Address Line 01</p>
          <Input style={inputBoxStyles} placeholder="Address Line 01" />

          <p style={pStyles}>Address Line 02 (optional)</p>
          <Input
            style={inputBoxStyles}
            placeholder="Address Line 02 (optional)"
          />

          <p style={pStyles}>Gender</p>
          <Radio.Group onChange={onChangeGender} value={gender}>
            <Radio value={"male"} style={{color:"white",}}>Male</Radio>
            <Radio value={"female"} style={{color:"white",}}>Female</Radio>
            <Radio value={"other"} style={{color:"white",}}>Other</Radio>
          </Radio.Group>

          <p style={pStyles}>Languages</p>
          {/* <Checkbox.Group className="custom-checkbox-group" options={plainOptions} onChange={onChangeChecked} /> */}
          <FormGroup style={{ display: "flex",flexDirection:"row"  }}>
      <FormControlLabel style={{color:"white"}} control={<Checkbox sx={{
          color: 'white',
          '&.Mui-checked': {
            color: 'blue',
          },
          '&.MuiCheckbox-root': {
            borderColor: 'white',
          },
        }}  />} label="Sinhala" />
      <FormControlLabel style={{color:"white"}}  control={<Checkbox sx={{
          color: 'white',
          '&.Mui-checked': {
            color: 'blue',
          },
          '&.MuiCheckbox-root': {
            borderColor: 'white',
          },
        }} />} label="Tamil" />
      <FormControlLabel style={{color:"white"}}  control={<Checkbox sx={{
          color: 'white',
          '&.Mui-checked': {
            color: 'blue',
          },
          '&.MuiCheckbox-root': {
            borderColor: 'white',
          },
        }} />} label="English" />
    </FormGroup>

          <p style={pStyles}>Password</p>
          <Input.Password style={inputBoxStyles} placeholder="Password" />

          <p style={pStyles}>Confirm Password</p>
          <Input.Password
            style={inputBoxStyles}
            placeholder="Confirm Password"
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <button className="submit-btn">SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
