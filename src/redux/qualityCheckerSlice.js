import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../apiService';

const initialState = {
    // Define your initial state here
    qLoading:false,
    requestTokenData:[],
    acceptRequestStatus:false,
    rejectRequestStatus:false,
};

//  get all token by quality checker
export const getRequestToken = createAsyncThunk(
    'qualityChecker/getRequestToken',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/quality-checker/get-request-token`);
  
        return response.data;
      } catch (error) {
        console.log(error)
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
//  accept 
  export const acceptQualityCheckerRequest = createAsyncThunk(
    "qualityChecker/acceptRequestToken",
    async ({ requestTokenId, 
      qualityCheckerId,
       color, imageURL,
        gender, type, 
        price, size, 
        description 
      }, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/quality-checker/accept-request-token`, {
                requestTokenId,
                qualityCheckerId,
                color,
                imageURL,
                gender,
                type,
                price,
                size,
                description
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

// reject

export const rejectRequestToken = createAsyncThunk(
  'qualityChecker/rejectRequestToken',
  async ({ requestTokenId, qualityCheckerId }, thunkAPI) => {
    try {
      // Make a POST request to the specified API endpoint with the provided data
      const response = await axios.post(`${BASE_URL}/api/v1/quality-checker/reject-request-token`, {
        requestTokenId,
        qualityCheckerId,
      });

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



const qualityCheckerSlice = createSlice({
    name: 'qualityChecker',
    initialState,
    reducers: {
        resetQualityChecker:(state, action)=>{
        //    write variables you want to clear after APIs are triggered successfully!
        state.acceptRequestStatus=false;
        state.rejectRequestStatus=false;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getRequestToken.pending, (state) => {
            state.qLoading = true;
            
          })
          .addCase(getRequestToken.fulfilled, (state, action) => {
            state.qLoading = false;
            state.requestTokenData=action.payload.data;
          })
          .addCase(getRequestToken.rejected, (state, action) => {
            state.qLoading = false;
          
          })
          //acceptQualityCheckerRequest
          .addCase(acceptQualityCheckerRequest.pending, (state) => {
            state.qLoading = true;
            state.acceptRequestStatus=false;
            
          })
          .addCase(acceptQualityCheckerRequest.fulfilled, (state, action) => {
            state.qLoading = false;
            state.acceptRequestStatus=true;
          })
          .addCase(acceptQualityCheckerRequest.rejected, (state, action) => {
            state.qLoading = false;
            state.acceptRequestStatus=false;
          
          })
          //rejectRequestToken

          .addCase(rejectRequestToken.pending, (state) => {
            state.qLoading = true;
            state.rejectRequestStatus=false;
            
          })
          .addCase(rejectRequestToken.fulfilled, (state, action) => {
            state.qLoading = false;
            state.rejectRequestStatus=true;
          })
          .addCase(rejectRequestToken.rejected, (state, action) => {
            state.qLoading = false;
            state.rejectRequestStatus=false;
          
          })

    },
});

export const { resetQualityChecker} = qualityCheckerSlice.actions;
export default qualityCheckerSlice.reducer;
