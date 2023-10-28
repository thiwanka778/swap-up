import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../apiService';

// console.log(BASE_URL)

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
  openRedux:false,
  requestTokenStatus:false,

  staffRegisterStatus:false,
  requestTokenData:[],
  createHelpRequest:false,
  complaintArray:[],
  profile:{},
  updateProfilePictureStatus:false,

  priceId:"",
  paymentLoading:false,
  createPaymentStatus:false,
  confirmPaymentStatus:false,
  subData:{},

};

// userRegister
export const userRegister = createAsyncThunk(
  "user/register",
  async ({ email, firstName, lastName, telephone,address, role, password,profilePicture,nic }, thunkAPI) => {
    try {
  
      const response = await axios.post(`${BASE_URL}/api/v1/user/register-customer`, {
        email,
        firstName,
        lastName,
        telephone,
        role,
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
        userName:email,
        userPassword:password,
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



export const staffRegister = createAsyncThunk(
  "user/staffRegister",
  async ({ email, firstName, lastName, telephone,address, role, password,profilePicture,nic }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/register-staff`,
       {
        email,
        firstName,
        lastName,
        telephone,
        role,
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


//  request token by customer 

export const requestTokenFromCustomer = createAsyncThunk(
  "customer/requestToken",
  async ({ customerId, itemDescription, itemImage }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/customer/RequestTokenFromCustomer`, {
        customerId: customerId,
        itemDescription: itemDescription,
        itemImage: itemImage,
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

// fetch request tokens

export const fetchAllRequestTokens = createAsyncThunk(
  'customer/fetchAllRequestTokens',
  async ({userId,email}, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/customer/AllRequestToken`,{userId,email});
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


// help request

export const helpRequest = createAsyncThunk(
  'customer/helpRequest',
  async ({ customerId, subject, message }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/customer/help-request`, {
        customerId: customerId,
        subject: subject,
        message: message,
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

// get all help reqyest by user

export const getHelpRequestById = createAsyncThunk(
  'customer/getHelpRequestById',
  async (id, thunkAPI) => {
    try {
      // Make a GET request to the specified API endpoint
      const response = await axios.get(`${BASE_URL}/api/v1/customer/get-help-request/${id}`);

      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors and reject the promise with an error message
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get user by ID

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/get-user/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// updateProfilePicture 

export const updateProfilePicture = createAsyncThunk(
  'user/updateProfilePicture',
  async ({ id, profilePic }, thunkAPI) => {
    try {
   
      const response = await axios.put(`${BASE_URL}/api/v1/user/update-profile-pic/${id}`, { profilePic });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createPaymentIntent = createAsyncThunk(
  'payment/createIntent',
  async (amount,thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment/create-payment-intent?amount=${amount}`);
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

export const getSubscribedDetail = createAsyncThunk(
  'payment/getSubscribedDetail',
  async (userId,thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/payment/get-subscribed-user/${userId}`);
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

export const confirmPayment = createAsyncThunk(
  'payment/confirm',
  async (userId,thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/payment/payment-complete/${userId}`);
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
      state.staffRegisterStatus=false;
      state.requestTokenStatus=false;
      state.createHelpRequest=false;
      state.updateProfilePictureStatus=false;
      state.createPaymentStatus=false;
      state.confirmPaymentStatus=false;
      state.priceId="";
      
    },
    getScreenWidth: (state, action) => {
      state.screen = action.payload;
    },
    getUserEmail:(state,action)=>{
        state.userEmail=action.payload;
    },
    userLoginTemp:(state,action)=>{
      const tempAdmin={role:action.payload}
      state.user=tempAdmin;
      window.localStorage.setItem("user",JSON.stringify(state.user));
    },
    qualityCheckerTemp:(state,action)=>{
       state.user={role:"quality_checker"}
       window.localStorage.setItem("user",JSON.stringify(state.user));
    },
    helpAssistantTemp:(state,action)=>{
      state.user={role:"help_assistant"}
      window.localStorage.setItem("user",JSON.stringify(state.user));
    },
    userLogout:(state,action)=>{
      state.user=null;
      state.profile={};
      window.localStorage.setItem("user",JSON.stringify(state.user));
    },
    openSideBarRedux:(state)=>{
      state.openRedux=true;
    },
    closeSideBarRedux:(state)=>{
      state.openRedux=false;
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
        // const data2=action.payload?.user;
        // const data3=action.payload?.jwtToken;
        state.user=action.payload;
        state.userError="";
        state.userLoginStatus=true;
        window.localStorage.setItem("user",JSON.stringify(state.user));
  
    
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userLoading = false;
        state.userError=action.payload;
        state.userLoginStatus=false 
     
      })

      // staff register by admin

      .addCase(staffRegister.pending, (state) => {
        state.userLoading = true;
        state.userError="";
        state.staffRegisterStatus=false; 
      })
      .addCase(staffRegister.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError="";
        state.staffRegisterStatus=true;
    
      })
      .addCase(staffRegister.rejected, (state, action) => {
        state.userLoading = false;
        state.userError=action.payload;
        state.staffRegisterStatus=false;
      })

      //  request token requestTokenFromCustomer

      .addCase(requestTokenFromCustomer.pending, (state) => {
        state.userLoading = true;
        state.requestTokenStatus=false;
    
      })
      .addCase(requestTokenFromCustomer.fulfilled, (state, action) => {
        state.userLoading = false;
        state.requestTokenStatus=true;

    
      })
      .addCase(requestTokenFromCustomer.rejected, (state, action) => {
        state.userLoading = false;
        state.requestTokenStatus=false;
      
      })
      // fetchAllRequestTokens

      .addCase(fetchAllRequestTokens.pending, (state) => {
        state.userLoading = true;
       
    
      })
      .addCase(fetchAllRequestTokens.fulfilled, (state, action) => {
        state.userLoading = false;
        state.requestTokenData=action.payload.data;

    
      })
      .addCase(fetchAllRequestTokens.rejected, (state, action) => {
        state.userLoading = false;
       
      
      })
      // helpRequest

      .addCase(helpRequest.pending, (state) => {
        state.userLoading = true;
        state.createHelpRequest=false;
    
      })
      .addCase(helpRequest.fulfilled, (state, action) => {
        state.userLoading = false;
        state.createHelpRequest=true;

    
      })
      .addCase(helpRequest.rejected, (state, action) => {
        state.userLoading = false;
        state.createHelpRequest=false;
      
      })
      // getHelpRequestById

      .addCase(getHelpRequestById.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getHelpRequestById.fulfilled, (state, action) => {
        state.userLoading = false;
        state.complaintArray=action.payload.data;
      })
      .addCase(getHelpRequestById.rejected, (state, action) => {
        state.userLoading = false;
      })

      //  get  profile details
      
      .addCase(getUserById.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userLoading = false;
        state.profile=action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userLoading = false;
      })

      //updateProfilePicture
      .addCase(updateProfilePicture.pending, (state) => {
        state.userLoading = true;
        state.updateProfilePictureStatus=false;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.userLoading = false;
        state.updateProfilePictureStatus=true;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.userLoading = false;
        state.updateProfilePictureStatus=false;
      })

      //createPaymentIntent

      .addCase(createPaymentIntent.pending, (state) => {
        state.paymentLoading = true;
        state.priceId="";
        state.createPaymentStatus=false;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        // console.log(action)
        state.priceId=action.payload;
        state.paymentLoading = false;
        state.createPaymentStatus=true;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.paymentLoading = false;
        state.createPaymentStatus=false;
        state.priceId="";
      })

    // confirmPayment 

    .addCase(confirmPayment.pending, (state) => {
      state.paymentLoading = true;
      state.confirmPaymentStatus=false;
    })
    .addCase(confirmPayment.fulfilled, (state, action) => {
      state.paymentLoading = false;
      state.confirmPaymentStatus=true;
    })
    .addCase(confirmPayment.rejected, (state, action) => {
      state.paymentLoading = false;
      state.confirmPaymentStatus=false;
    })
// getSubscribedDetail

.addCase(getSubscribedDetail.pending, (state) => {
  state.paymentLoading = true;
})
.addCase(getSubscribedDetail.fulfilled, (state, action) => {
  state.paymentLoading = false;
  state.subData=action.payload;
})
.addCase(getSubscribedDetail.rejected, (state, action) => {
  state.paymentLoading = false;
})




  },
});

export const { getScreenWidth ,getUserEmail,userLogout, resetUser,closeSideBarRedux,
  openSideBarRedux,userLoginTemp,qualityCheckerTemp,helpAssistantTemp} = userSlice.actions;
export default userSlice.reducer;
