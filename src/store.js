import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import inventoryReducer from "./redux/inventorySlice";
import adminReducer from "./redux/adminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    inventory:inventoryReducer,
    admin:adminReducer,
  },
});

export default store;
