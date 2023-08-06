import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../apiService';

console.log(BASE_URL)

 const localUser=window.localStorage.getItem("user");

const initialState = {
  screen:window.innerWidth,
  userEmail:"",
  user:localUser?JSON.parse(localUser):null,
  userLoading:false,
  userError:"",
  userRegisterStatus:false,
  userRegisterMessage:"",

  userVerifyStatus:false,
  userVerifyMessage:"",

  userLoginStatus:false,
  userLoginMessage:"",
};

// userRegister
export const userRegister = createAsyncThunk(
  "user/register",
  async ({ email, firstName, lastName, telephone,address, roll, password,profilePicture,nic }, thunkAPI) => {
    try {
  
      const response = await axios.post(`${BASE_URL}/api/v1/user/register-customer`, {
        email,
        firstName,
        lastName,
        telephone,
        roll,
        password,
        profilePicture,
        nic,
        address,
      });

     
      return response.data;
    } catch (error) {
     
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

    
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// userVerify

export const userVerify = createAsyncThunk(
  "user/verify",
  async ({verifyCode}, thunkAPI) => {
    try {
  
      const response = await axios.get(`${BASE_URL}/api/v1/user/verification/?code=${verifyCode}`);

     
      return response.data;
    } catch (error) {
     
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

    
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// userLogin

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
  
      const response = await axios.post(`${BASE_URL}/api/v1/user/login`, {
        email,
        password,
      });

     
      return response.data;
    } catch (error) {
     
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

    
      return thunkAPI.rejectWithValue(message);
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    resetUser:(state, action)=>{
      state.userError="";
      state.userRegisterStatus=false;
      state.userRegisterMessage="";
      state.userVerifyStatus=false;
      state.userVerifyMessage="";
      state.userLoginStatus=false;
      state.userLoginMessage="";
    },
    getScreenWidth: (state, action) => {
      state.screen = action.payload;
    },
    getUserEmail:(state,action)=>{
        state.userEmail=action.payload;
    },
    userLoginTemp:(state,action)=>{
      state.user=action.payload;
      window.localStorage.setItem("user",JSON.stringify(state.user));
    },
    userLogout:(state,action)=>{
      state.user=null;
      window.localStorage.setItem("user",JSON.stringify(state.user));
    }
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.userLoading = true;
        state.userError="";
        state.userRegisterStatus=false;
        state.userRegisterMessage="";
        
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError="";
        state.userRegisterStatus=true;
        state.userRegisterMessage=action.payload;
    
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.userLoading = false;
        state.userError=action.payload;
        state.userRegisterStatus=false;
        state.userRegisterMessage="";
     
      })

      // userVeify

      .addCase(userVerify.pending, (state) => {
        state.userLoading = true;
        state.userError="";
        state.userVerifyMessage="";
        state.userVerifyStatus=false;
        
      })
      .addCase(userVerify.fulfilled, (state, action) => {
        console.log(action)
        state.userLoading = false;
        state.userError="";
        state.userVerifyMessage=action.payload;
        state.userVerifyStatus=true;
  
    
      })
      .addCase(userVerify.rejected, (state, action) => {
        console.log(action)
        state.userLoading = false;
        state.userError=action.payload;
        state.userVerifyMessage="";
        state.userVerifyStatus=false;
     
      })
      // user login

      .addCase(userLogin.pending, (state) => {
        state.userLoading = true;
        state.userError="";
        state.userLoginStatus=false
      
       
        
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userLoading = false;
        console.log(action)
        state.userError="";
        state.userLoginStatus=true;
       
  
    
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userLoading = false;
        state.userError=action.payload;
        state.userLoginStatus=false
       
     
      })



  },
});

export const { getScreenWidth ,getUserEmail,userLogout, resetUser,userLoginTemp} = userSlice.actions;
export default userSlice.reducer;
