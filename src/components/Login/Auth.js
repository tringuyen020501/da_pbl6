import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const setToken = (token) => {
   localStorage.setItem("token", token);
};
export const fetchToken = (token) => {
   return localStorage.getItem("token");
};

function Auth({ children }) {
   let auth = fetchToken();
   let location = useLocation();
   if (!auth) {
      return <Navigate to="/" state={{ from: location }} />;
   }
   return children;
}

export default Auth;
