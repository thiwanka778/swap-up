import React from "react";
import "./SignUp.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import simage from "../../assets/simage.png";
import { Input,Select } from "antd";
import { Radio } from 'antd';
import { Checkbox } from 'antd';
import { useNavigate } from "react-router-dom";
import {getUserEmail} from "../../redux/userSlice";

const options=[
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'other',
    label: 'Other',
  },
  {
    value:"Select your gender",
    label: "Select your gender",
    disabled:true,
  },
 
]

const plainOptions = ['Sinhala', 'Tamil', 'English'];

const pStyles = {
  fontSize: "1.2rem",
  fontFamily: "'Ubuntu', sans-serif",
  fontWeight: "500",
  letterSpacing: "0.1rem",
  marginTop:"1.5rem",
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
  marginTop: "0.3rem",
  // marginBottom: "1.5rem",
};


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { userEmail, screen } = useSelector((state) => state.user);
  const [gender,setGender] = React.useState(1);
  const onChangeGender = (e) => {
    // console.log('radio checked', e.target.value);
    setGender(e.target.value);
  };

  const onChangeChecked = (checkedValues) => {
    // console.log('checked = ', checkedValues);
  };

  return (
    <>
      <div className="signup" style={{}}>
        <div
          className="signup-container"
          style={{
            display: "flex",
            width: "100%",
            height: screen < 500 ? "" : "83vh",
            flexDirection: screen < 500 ? "column-reverse" : "row",
          }}
        >
          <section
            style={{
              width: screen < 500 ? "100%" : "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={simage}
              style={{ width: "100%", height: screen < 500 ? "" : "100%" }}
            />
          </section>

          <section
            style={{
              width: screen < 500 ? "100%" : "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflowY: screen < 500 ? "" : "auto",
            }}
          >
            <div
              style={{
                width: screen < 500 ? "95%" : "500px",
                height: screen < 500 ? "" : "80vh",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom:"0.8rem",
                  marginTop:"0.8rem",
                  
                }}
              >
                <p
                  style={{
                    color: "#00425A",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    fontFamily: "'Ubuntu', sans-serif",
                  }}
                >
                  Register To Become A Member
                </p>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom:"1.5rem",
                }}
              >
                <p
                  style={{
                    color: "#00425A",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    fontFamily: "'Ubuntu', sans-serif",
                  }}
                >
                  We Need Your Details To Complete Your Registration{" "}
                </p>
              </div>

              <p style={pStyles}>First Name</p>
              <Input placeholder="First Name" style={inputBoxStyles} />

              <p style={pStyles}>Last Name</p>
              <Input placeholder="Last Name" style={inputBoxStyles} />

              <p style={pStyles}>Gmail</p>
              <Input value={userEmail} style={inputBoxStyles} disabled={true} />

              <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
              <p style={{fontFamily:" 'Poppins', sans-serif",color:"blue",fontSize:"0.8rem",cursor:"pointer",fontWeight:"500"}} 
              onClick={()=>{
                navigate("/");
                dispatch(getUserEmail(""))
              }}>Change gmail</p>
              </div>

              <p style={pStyles}>Phone Number</p>
              <Input placeholder="Phone Number" style={inputBoxStyles} />

              <p style={pStyles}>NIC</p>
              <Input placeholder="NIC" style={inputBoxStyles} />

              <p style={pStyles}>Address</p>
              <Input placeholder="Address" style={inputBoxStyles} />

              <p style={pStyles}>Gender</p>
              <Radio.Group onChange={onChangeGender} value={gender} style={{ marginTop: "0.3rem",
 }}>
      <Radio value={"male"}>Male</Radio>
      <Radio value={"female"}>Female</Radio>
      <Radio value={"other"}>Other</Radio>

    </Radio.Group>
             


              <p style={pStyles}>City</p>
              <Input placeholder="City" style={inputBoxStyles} />


              <p style={pStyles}>Speaking Languages</p>
              <Checkbox.Group options={plainOptions} onChange={onChangeChecked} style={{ marginTop: "0.3rem",
  }}/>

              <p style={pStyles}>Password</p>
              <Input.Password placeholder="Password" style={inputBoxStyles} />

              <p style={pStyles}>Confirm Password</p>
              <Input.Password placeholder="Confirm Password" style={inputBoxStyles} />

              <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"1.5rem",marginBottom:"1.5rem"}} >
<button  type="button" className="submit-btn" style={{marginBottom:"1.5rem"}} >SIGN UP</button>
              </div>

            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignUp;
