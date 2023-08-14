import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../apiService';


const initialState = {
    inventoryLoading:false,
    inventoryErrorMessage:"",
    inventoryError:false,
    inventoryStatus:false,

    inventoryCreateItemStatus:false,
    listingItems:[],

    favoriteList:[],
    addFavoriteStatus:false,

    deleteFavoriteStatus:false,

  };

  export const createItemOnListing = createAsyncThunk(
    "inventory/creatingListingItems",
    async ({ 
        activeState,color,gender2,imageURL,priceRange,qualityStatus,size,type
     }, thunkAPI) => {
      try {
    
        const response = await axios.post(`${BASE_URL}/api/v1/item/save-item`, {
            activeState,color,gender:gender2,imageURL,priceRange,qualityStatus,size,type
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

  export const getItemsOnListing = createAsyncThunk(
    "inventory/getListingItems",
    async (_, thunkAPI) => {
      try {
    
        const response = await axios.get(`${BASE_URL}/api/v1/item/get-items`);
  
       
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


  export const addFavoriteByUser = createAsyncThunk(
    "inventory/addFavoriteByUser",
    async ({ 
       userId,itemId
     }, thunkAPI) => {
      try {
        
        const response = await axios.post(`${BASE_URL}/api/v1/favorites/add-favorites`, {
          userId,itemId
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

  export const fetchFavoriteItemsByUser = createAsyncThunk(
    "inventory/fetchFavoriteItemsByUser",
    async ({ userId}, thunkAPI) => {
      try {
        
        const user=window.localStorage.getItem("user");
        const token=user?JSON.parse(user)?.token:"";

        const response = await axios.get(`${BASE_URL}/api/v1/favorites/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  export const deleteFavoriteItem = createAsyncThunk(
    "inventory/deleteFavoriteItem",
    async ({ userId,itemId}, thunkAPI) => {
      try {
        
        const user=window.localStorage.getItem("user");
        const token=user?JSON.parse(user)?.token:"";

        const response = await axios.delete(`${BASE_URL}/api/v1/favorites/${userId}/items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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



  

  const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
  inventoryReset:(state,action)=>{
    state.inventoryErrorMessage="";
    state.inventoryError=false;
    state.inventoryStatus=false;
    state.inventoryCreateItemStatus=false;
    state.addFavoriteStatus=false;
    state.deleteFavoriteStatus=false;
  },
     
    },
    extraReducers: (builder) => {
        // save items by inventory manager
        builder.addCase(createItemOnListing.pending, (state) => {
          state.inventoryLoading = true;
          state.inventoryError = false;
          state.inventoryErrorMessage = "";
          state.inventoryStatus=false;
          state.inventoryCreateItemStatus=false;
        })
        builder.addCase(createItemOnListing.fulfilled, (state) => {
          state.inventoryLoading = false;
          state.inventoryError = false;
          state.inventoryErrorMessage = "";
          state.inventoryStatus=true;
          state.inventoryCreateItemStatus=true;
        })
        builder.addCase(createItemOnListing.rejected, (state, action) => {
          state.inventoryLoading = false;
          state.inventoryError = true;
          state.inventoryErrorMessage = action.payload;
          state.inventoryStatus=false;
          state.inventoryCreateItemStatus=false;
        })

        // get listing items


        builder.addCase(getItemsOnListing.pending, (state) => {
            state.inventoryLoading = true;
            state.inventoryError = false;
            state.inventoryErrorMessage = "";
            state.inventoryStatus=false;
        
          })
          builder.addCase(getItemsOnListing.fulfilled, (state,action) => {
            state.inventoryLoading = false;
            state.inventoryError = false;
            state.inventoryErrorMessage = "";
            state.inventoryStatus=true;
            state.listingItems=action.payload;
          
          })
          builder.addCase(getItemsOnListing.rejected, (state, action) => {
            state.inventoryLoading = false;
            state.inventoryError = true;
            state.inventoryErrorMessage = action.payload;
            state.inventoryStatus=false;
          
          })

          // add favorite item by user

          builder.addCase(addFavoriteByUser.pending, (state) => {
            state.inventoryLoading = true;
            state.inventoryError = false;
            state.inventoryErrorMessage = "";
            state.inventoryStatus=false;
            state.addFavoriteStatus=false;
        
          })
          builder.addCase(addFavoriteByUser.fulfilled, (state,action) => {
            state.inventoryLoading = false;
            state.inventoryError = false;
            state.inventoryErrorMessage = "";
            state.inventoryStatus=true;
            state.addFavoriteStatus=true;
            
          
          })
          builder.addCase(addFavoriteByUser.rejected, (state, action) => {
            state.inventoryLoading = false;
            state.inventoryError = true;
            state.inventoryErrorMessage = action.payload;
            state.inventoryStatus=false;
            state.addFavoriteStatus=false;
          
          })

          // fetch favorite list by user

          builder.addCase(fetchFavoriteItemsByUser.pending, (state) => {
            state.inventoryLoading = true;
           
            
        
          })
          builder.addCase(fetchFavoriteItemsByUser.fulfilled, (state,action) => {
            state.inventoryLoading = false;
            state.favoriteList=action.payload;
            
            
          
          })
          builder.addCase(fetchFavoriteItemsByUser.rejected, (state, action) => {
            state.inventoryLoading = false;
           
          
          
          })

          // delete favorite by user 

          
          builder.addCase(deleteFavoriteItem.pending, (state) => {
            state.inventoryLoading = true;
            state.deleteFavoriteStatus=false;
            
        
          })
          builder.addCase(deleteFavoriteItem.fulfilled, (state,action) => {
            state.inventoryLoading = false;
            state.deleteFavoriteStatus=true;
            
            
          
          })
          builder.addCase(deleteFavoriteItem.rejected, (state, action) => {
            state.inventoryLoading = false;
            state.deleteFavoriteStatus=false;
          
          
          })






      },
  
  });
  
  export const { inventoryReset } = inventorySlice.actions;
  export default inventorySlice.reducer;


