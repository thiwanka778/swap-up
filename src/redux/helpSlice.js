import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../apiService';

const initialState = {
    // Define your initial state here
};

export const getHelpRequestById = createAsyncThunk(
    "help/getHelpRequestById",
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

const helpSlice = createSlice({
    name: 'help',
    initialState,
    reducers: {
        // Define your additional reducers here if needed
    },
    extraReducers: (builder) => {
        // Define how your state should be updated based on the async thunk actions
        builder.addCase(getHelpRequestById.pending, (state) => {
            // Handle the pending action, if necessary
        });
        builder.addCase(getHelpRequestById.fulfilled, (state, action) => {
            // Handle the fulfilled action, update the state with the data from the action
        });
        builder.addCase(getHelpRequestById.rejected, (state, action) => {
            // Handle the rejected action, update the state with the error message
        });
    },
});

export const { /* Define any additional actions here */ } = helpSlice.actions;
export default helpSlice.reducer;
