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
    unprocessedSwapItems:[],
    arrivedOrReturnItemStatus:false,

    unshippedSwapArray:[],
    shipSwappingStatus:false,

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

  export const getAllUnprocessedSwapItems = createAsyncThunk(
    'inventory/getAllUnprocessedSwapItems',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/inventory-manager/get-all-unprocessed-swap-item`);
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

  export const arrivedOrReturnItem = createAsyncThunk(
    'inventoryManager/arrivedOrReturnItem',
    async ({ inventoryManagerId, requestId, shippingStatus }, thunkAPI) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/v1/inventory-manager/arrived_or_return_item?inventory-manager-id=${inventoryManagerId}&request-token-id=${requestId}&shipping-status=${shippingStatus}`);
        return response.data;
      } catch (error) {
        console.log(error);
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  
  
  
  export const getAllUnshippedSwapItems = createAsyncThunk(
    'GET_ALL_UNSHIPPED_SWAP_ITEMS',
    async (_, thunkAPI) => {
      try {
        // Make the GET request
        const response = await axios.get(`${BASE_URL}/api/v1/inventory-manager/get-all-unShipped-swap-item`);
  
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


  export const shipSwappingItem = createAsyncThunk(
    'SHIP_SWAPPING_ITEM',
    async ({ inventoryManagerId, swapId, status }, thunkAPI) => {
      try {
        // Define the request parameters as an object
        
  
        // Make the POST request with query parameters in the URL
        const response = await axios.post(`${BASE_URL}/api/v1/inventory-manager/shipped-swapping-item?inventory-manager-id=${inventoryManagerId}&swap-id=${swapId}&status=${status}`);
  
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
    state.arrivedOrReturnItemStatus=false;
    state.shipSwappingStatus=false;
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
            state.listingItems=action.payload.data;
          
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

          // getAllUnprocessedSwapItems


          builder.addCase(getAllUnprocessedSwapItems.pending, (state) => {
            state.inventoryLoading = true;
          })
          builder.addCase(getAllUnprocessedSwapItems.fulfilled, (state,action) => {
            state.inventoryLoading = false;
            state.unprocessedSwapItems=action.payload?.data;
          })
          builder.addCase(getAllUnprocessedSwapItems.rejected, (state, action) => {
            state.inventoryLoading = false;
          })

          //arrivedOrReturnItem

          builder.addCase(arrivedOrReturnItem.pending, (state) => {
            state.inventoryLoading = true;
            state.arrivedOrReturnItemStatus=false;
          })
          builder.addCase(arrivedOrReturnItem.fulfilled, (state,action) => {
            state.inventoryLoading = false;
            state.arrivedOrReturnItemStatus=true;
            
          })
          builder.addCase(arrivedOrReturnItem.rejected, (state, action) => {
            state.inventoryLoading = false;
            state.arrivedOrReturnItemStatus=false;
          })

          //getAllUnshippedSwapItems

          builder.addCase(getAllUnshippedSwapItems.pending, (state) => {
            state.inventoryLoading = true;
           
          })
          builder.addCase(getAllUnshippedSwapItems.fulfilled, (state,action) => {
            state.inventoryLoading = false;
            state.unshippedSwapArray=action.payload;
           
            
          })
          builder.addCase(getAllUnshippedSwapItems.rejected, (state, action) => {
            state.inventoryLoading = false;
           
          })

          //shipSwappingItem

          builder.addCase(shipSwappingItem.pending, (state) => {
            state.inventoryLoading = true;
            state.shipSwappingStatus=false;
           
          })
          builder.addCase(shipSwappingItem.fulfilled, (state,action) => {
            state.inventoryLoading = false;
            state.shipSwappingStatus=true;
            
          
            
          })
          builder.addCase(shipSwappingItem.rejected, (state, action) => {
            state.inventoryLoading = false;
            state.shipSwappingStatus=false;
           
          })








      },
  
  });
  
  export const { inventoryReset } = inventorySlice.actions;
  export default inventorySlice.reducer;


