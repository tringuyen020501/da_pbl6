import {
   Button,
   Container,
   Grid,
   IconButton,
   InputAdornment,
   Paper,
   TextField,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchToken, setToken } from "./Auth";
// import { loginUser } from "../Redux/apiRequest";

function Login() {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      email: "",
      pass: "",
      showPass: false,
   });
   // const handleSubmit = (e) => {
   //    e.preventDefault();
   //    axios
   //       .post("https://reqres.in/api/login", {
   //          email: values.email,
   //          password: values.pass,
   //       })
   //       .then((res) => {
   //          console.log(res.data.token, "res.data.token");
   //          if (res.data.token) {
   //             // setToken(res.data.token);
   //             navigate("/");
   //          }
   //       })
   //       .catch((err) => console.error(err));
   // };

   const handleSubmit = (e) => {
      e.preventDefault();
      axios({
         url: "https://pbl6.tuongnh.tech/auth/",
         methoad: "POST",
         header: {
            "Content-Type": "multipart/form-data",
         },
         email: values.email,
         password: values.pass,
      })
         .then((res) => {
            console.log(res.data.token, "res.data.token");
            if (res.data.token) {
               // setToken(res.data.token);
               navigate("/");
            }
         })
         .catch((err) => console.error(err));
   };

   // const handleSubmit = (e) => {
   //    e.preventDefault();
   //    const newUser ={
   //       email: values.email,
   //       password: values.pass,

   //    };
   //    loginUser(newUser, dispatch, navigate);
   // }

   const handlePass = () => {
      setValues({
         ...values,
         showPass: !values.showPass,
      });
   };

   return (
      <div>
         <Container maxWidth="sm">
            <Grid
               container
               spacing={2}
               direction="column"
               justifyContent="center"
               style={{ minHeight: "100vh" }}
            >
               <Paper elevation={2} sx={{ padding: 5 }}>
                  <form onSubmit={handleSubmit}>
                     <Grid container direction="column" spacing={2}>
                        <Grid item>
                           <TextField
                              type="email"
                              fullWidth
                              label="Email Address"
                              placeholder="Email Address"
                              variant="outlined"
                              onChange={
                                 (e) =>
                                    setValues({
                                       ...values,
                                       email: e.target.value,
                                    })
                                 // setValues({ email: e.target.value })
                              }
                           />
                        </Grid>

                        <Grid item>
                           <TextField
                              type={values.showPass ? "text" : "password"}
                              fullWidth
                              label="Password"
                              placeholder="Password"
                              variant="outlined"
                              onChange={
                                 (e) =>
                                    setValues({
                                       ...values,
                                       pass: e.target.value,
                                    })
                                 // setValues({  pass: e.target.value })
                              }
                              InputProps={{
                                 endAdornment: (
                                    <InputAdornment position="end">
                                       <IconButton
                                          onClick={handlePass}
                                          aria-label="toggle password"
                                          edge="end"
                                       >
                                          {values.showPass ? (
                                             <VisibilityOffIcon />
                                          ) : (
                                             <VisibilityIcon />
                                          )}
                                       </IconButton>
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        </Grid>

                        <Grid item>
                           <Button type="submit" variant="contained" fullWidth>
                              Sign In
                           </Button>
                        </Grid>
                     </Grid>
                  </form>
               </Paper>
            </Grid>
         </Container>
      </div>
   );
}

export default Login;
