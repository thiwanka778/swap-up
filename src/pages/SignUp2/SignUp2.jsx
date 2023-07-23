import React, { useState } from "react";
import "./SignUp2.css";
import { Input, Select } from "antd";
import { Radio } from "antd";
// import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getUserEmail } from "../../redux/userSlice";
import { FaTimes } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const validatePStyles = {
  color: "white",
  fontFamily: "'Ubuntu', sans-serif",
  fontWeight: 500,
  letterSpacing: "0.1rem",
  marginLeft: "0.3rem",
};

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
  fontWeight: "600",
  letterSpacing: "0.2rem",
  marginBottom: "0.6rem",
  marginTop: "2rem",
  color: "black",
  //  textShadow:"2px 2px 1px black",
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
  color: "white",
  // marginBottom: "1.5rem",
};

const SignUp2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEmail, screen } = useSelector((state) => state.user);
  const [gender, setGender] = React.useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNicValidate , setIsNicValidate]=React.useState(false);
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
  });
  const [nic, setNic] = React.useState("");

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    let newValue = "";
    if (name === "firstName" || name === "lastName") {
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

  

  React.useEffect(() => {
    const validateNIC = (nic) => {
      const nicRegex = /^(\d{9}[Vv]|\d{11})$/;

      if (nicRegex.test(nic)) {
        console.log('Valid NIC');
        setIsNicValidate(true)
      } else {
        console.log('Invalid NIC');
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

  //  console.log({...form,gender,password,confirmPassword,gmail:userEmail,})
  // console.log({ nic, isNicValidate });

  return (
    <div className="sign-up2">
      <div className="main-signup-container">
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "2rem",
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
            Register To Become A Membe
          </p>
          <p
            style={{
              fontFamily: "'Ubuntu', sans-serif",
              fontSize: "1.75rem",
              color: "white",
              fontWeight: "500",
              marginTop: "1rem",
              fontWeight: "600",
              width: "fit-content",
              letterSpacing: "0.2rem",
              textShadow: "3px 3px 1px black",
            }}
          >
            We Need Your Details To Complete Your Registration.
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

          <p style={pStyles}>Gmail</p>
          <Input
            value={userEmail}
            disabled
            style={inputBoxStylesGmail}
            placeholder="Gmail"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "0.3rem",
            }}
          >
            <p
              onClick={changeEmailClick}
              style={{
                color: "white",
                fontFamily: "'Ubuntu', sans-serif",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              change gmail
            </p>
          </div>

          <p style={pStyles}>Address Line 01</p>
          <Input
            style={inputBoxStyles}
            placeholder="Address Line 01"
            onChange={handleFormChange}
            name="address"
            value={form.address}
          />

          <p style={pStyles}>Address Line 02 (optional)</p>
          <Input
            style={inputBoxStyles}
            onChange={handleFormChange}
            name="address2"
            value={form.address2}
            placeholder="Address Line 02 (optional)"
          />

          <p style={pStyles}>Gender</p>
          <Radio.Group onChange={onChangeGender} value={gender}>
            <Radio
              value={"male"}
              style={{
                color: "black",
                fontWeight: "bold",
                fontFamily: "'Ubuntu', sans-serif",
              }}
            >
              Male
            </Radio>
            <Radio
              value={"female"}
              style={{
                color: "black",
                fontWeight: "bold",
                fontFamily: "'Ubuntu', sans-serif",
              }}
            >
              Female
            </Radio>
            <Radio
              value={"other"}
              style={{
                color: "black",
                fontWeight: "bold",
                fontFamily: "'Ubuntu', sans-serif",
              }}
            >
              Other
            </Radio>
          </Radio.Group>

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
            <button className="submit-btn">SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
