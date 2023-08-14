import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import inventoryReducer from "./redux/inventorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    inventory:inventoryReducer,
  },
});

export default store;
