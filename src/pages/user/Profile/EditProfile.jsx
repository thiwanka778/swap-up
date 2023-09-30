import React ,{useState} from 'react';
import "./Profile.css";
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../redux/userSlice';

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
     marginBottom:"1.5rem",
  
  }

const EditProfile = () => {
const dispatch=useDispatch();
  const {user,profile}=useSelector((state)=>state.user);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    nic: "",
    telephone: "",
    profilePicture: "", 
    address: "",
    role: "",
  });

  React.useEffect(()=>{
     dispatch(getUserById(user?.userId))
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  React.useEffect(()=>{
    const { email,
    firstName,
    lastName,
    nic,
    telephone,
    profilePicture,
    address,
    role}=profile;
      setFormData((prevState)=>{
        return {
          email,
          firstName,
          lastName,
          nic,
          telephone,
          profilePicture,
          address,
          role
        }
      })
  },[profile]);

  // console.log(formData);



  return (
    <div>
  <p style={pStyles}>First Name</p>
      <Input
        style={inputStyles}
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />

      <p style={pStyles}>Last Name</p>
      <Input
        style={inputStyles}
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
      />

      <p style={pStyles}>Email</p>
      <Input
        style={inputStyles}
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <p style={pStyles}>Address Line</p>
      <Input
        style={inputStyles}
        name="address"
        value={formData.address}
        onChange={handleInputChange}
      />

      <p style={pStyles}>NIC</p>
      <Input
        style={inputStyles}
        name="nic"
        value={formData.nic}
        onChange={handleInputChange}
      />

      <p style={pStyles}>Phone Number</p>
      <Input
        style={inputStyles}
        name="telephone"
        value={formData.telephone}
        onChange={handleInputChange}
      />

<div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
    <button className='r-edit-btn' style={{marginRight:"1rem"}}>Reset</button>
<button className='p-edit-btn'>Save changes</button>
</div>

        
    </div>
  )
}

export default EditProfile