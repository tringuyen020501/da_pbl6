import axios from "axios";
import {loginStart, loginSuccess,loginFailed} from "../Redux/authSlice"

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try{
        const res = axios.post("https://reqres.in/api/login",user);
        dispatch(loginSuccess(res.data))
        navigate("/")

    }catch(e){
        dispatch(loginFailed)
    }
}