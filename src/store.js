import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import inventoryReducer from "./redux/inventorySlice";
import adminReducer from "./redux/adminSlice";
import qualityCheckerReducer from "./redux/qualityCheckerSlice";
import helpReducer from "./redux/helpSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    inventory:inventoryReducer,
    admin:adminReducer,
    qualityChecker:qualityCheckerReducer,
    help:helpReducer,
  },
});

export default store;
