import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice.js"

export default configureStore({
    reducer:{
        auth: authReducer,
        
    },
});
