import React from 'react';
import "./SignUp.css";
import TextField from '@mui/material/TextField';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const dispatch=useDispatch();
    const {userEmail,screen}=useSelector((state)=>state.user);
  
    


  return (
    <>
     <div className='signup'>
        <h1>Sign UP</h1>
        <TextField 
              value={userEmail}
             disabled
               label="Gmail" variant="outlined" />
    </div>

    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 2000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
    custom: {
        duration: 2000,
        theme: {
          primary: 'green',
          secondary: 'black',
        },
      },
  }}
/>
    </>
   
  )
}

export default SignUp