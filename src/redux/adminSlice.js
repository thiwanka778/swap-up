import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../apiService';

const initialState = {
  adminLoading: false,
  userArrayByAdmin: [],
  adminError: false,
  adminErrorMessage: "",

  putOnHoldStatus:false,
  removeUserHoldStatus:false,
  
};

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsersByAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/get-all-users`);
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

// hold account
export const putUserOnHold = createAsyncThunk(
  "admin/putUserOnHold",
  async ({ 
     adminId,
    customerId,
     action,
    reason,
  }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/hold-user`,{
        adminId,
        customerId,
         action,
        reason,
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

// release account

export const removeUserHold = createAsyncThunk(
  "admin/removeUserHold",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/${userId}/remove-hold`);
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

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminReset:(state,action)=>{
state.adminError=false;
state.adminErrorMessage="";
state.putOnHoldStatus=false;
state.removeUserHoldStatus=false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.adminLoading = true;
    
    })
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.adminLoading = false;
      state.userArrayByAdmin = action.payload;
    })
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.adminLoading = false;
      
    })
    // put on hold 

    builder.addCase(putUserOnHold.pending, (state) => {
      state.adminLoading = true;
      state.putOnHoldStatus=false;
    })
    builder.addCase(putUserOnHold.fulfilled, (state, action) => {
      state.adminLoading = false;
      state.putOnHoldStatus=true;
    
    })
    builder.addCase(putUserOnHold.rejected, (state, action) => {
      state.adminLoading = false;
      state.putOnHoldStatus=false;
    })

      // Add the reducer cases for removeUserHold
      builder.addCase(removeUserHold.pending, (state) => {
        state.adminLoading = true;
        state.removeUserHoldStatus=false;
      });
      builder.addCase(removeUserHold.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.removeUserHoldStatus=true;
       
      });
      builder.addCase(removeUserHold.rejected, (state, action) => {
        state.adminLoading = false;
        state.removeUserHoldStatus=false;
      });
  },
});

export const { adminReset} = adminSlice.actions;

export default adminSlice.reducer;
