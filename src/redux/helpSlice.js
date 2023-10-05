import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../apiService';

const initialState = {
    helpLoading:false,
    helpArray:[],
    sendReplyStatus:false,
};

export const getHelpRequests = createAsyncThunk(
    'helpAssistant/getHelpRequests',
    async (_, thunkAPI) => {
      try {
        // Make a GET request to the specified API endpoint
        const response = await axios.get(`${BASE_URL}/api/v1/help-assistant/GetHelpRequests`);
  
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
  export const checkHelpRequestFromHelpAssistant = createAsyncThunk(
    'helpAssistant/checkHelpRequest',
    async ({ helpRequestId, helpAssistantId, reply }, thunkAPI) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/api/v1/help-assistant/CheckHelpRequestFromHelpAssistant`,
          {
            helpRequestId,
            helpAssistantId,
            reply,
          }
        );
  
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


const helpSlice = createSlice({
    name: 'help',
    initialState,
    reducers: {
        // Define your additional reducers here if needed
        resetHelp:(state,action)=>{
          state.sendReplyStatus=false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getHelpRequests.pending, (state) => {
            state.helpLoading = true;
            
            
          })
          .addCase(getHelpRequests.fulfilled, (state, action) => {
            state.helpLoading = false;
            state.helpArray=action.payload.data;
           
        
          })
          .addCase(getHelpRequests.rejected, (state, action) => {
            state.helpLoading = false;
         
         
          })
          //checkHelpRequestFromHelpAssistant
          .addCase(checkHelpRequestFromHelpAssistant.pending, (state) => {
            state.helpLoading = true;
            state.sendReplyStatus=false;
            
          })
          .addCase(checkHelpRequestFromHelpAssistant.fulfilled, (state, action) => {
            state.helpLoading = false;
             state.sendReplyStatus=true;
           
        
          })
          .addCase(checkHelpRequestFromHelpAssistant.rejected, (state, action) => {
            state.helpLoading = false;
            state.sendReplyStatus=false;
         
         
          })

     
    },
});

export const { resetHelp } = helpSlice.actions;
export default helpSlice.reducer;
