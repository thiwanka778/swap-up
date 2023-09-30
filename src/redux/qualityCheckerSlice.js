import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../apiService';

const initialState = {
    // Define your initial state here
    qLoading:false,
    requestTokenData:[],
    acceptRequestStatus:false,
};

//  get all token by quality checker
export const getRequestToken = createAsyncThunk(
    'qualityChecker/getRequestToken',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/quality-checker/get-request-token`);
  
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



const qualityCheckerSlice = createSlice({
    name: 'qualityChecker',
    initialState,
    reducers: {
        resetQualityChecker:(state, action)=>{
        //    write variables you want to clear after APIs are triggered successfully!
        state.acceptRequestStatus=false;
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
    },
});

export const { resetQualityChecker} = qualityCheckerSlice.actions;
export default qualityCheckerSlice.reducer;
