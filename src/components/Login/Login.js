import {
   Button,
   Grid,
   IconButton,
   InputAdornment,
   Paper,
   TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import jwt_decode from "jwt-decode";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Copyright(props) {
   return (
      <Typography
         variant="body2"
         color="text.secondary"
         align="center"
         {...props}
      >
         {"Copyright © "}
         <Link color="inherit" href="">
            SoDo
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}
const theme = createTheme();

export default function Login() {
   const navigate = useNavigate();

   const [values, setValues] = useState({
      username: "",
      password: "",
      showPass: false,
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", values.username);
      urlencoded.append("password", values.password);

      var requestOptions = {
         method: "POST",
         headers: myHeaders,
         body: urlencoded,
         redirect: "follow",
      };

      fetch("https://pbl6.tuongnh.tech/auth/", requestOptions)
         .then((response) => {
            if (response.ok) {
               return response.json();
            }
            throw Error(response.status);
         })
         .then((data) => {
            localStorage.setItem("access_token", data.access_token);
            const token = data.access_token;
            const decoded = jwt_decode(token);
            console.log(decoded);
            if (decoded.role === 1) {
               navigate("/admin");
            } else if (decoded.role === 0) {
               navigate("/user");
            }
         })
         .catch((error) => {
            console.log("error", error);
            alert("username, password are wrong");
         });
   };

   const handlePass = () => {
      setValues({
         ...values,
         showPass: !values.showPass,
      });
   };

   return (
      <div>
         <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
               <CssBaseline />
               <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                     backgroundImage: "url(https://source.unsplash.com/random)",
                     backgroundRepeat: "no-repeat",
                     backgroundColor: (t) =>
                        t.palette.mode === "light"
                           ? t.palette.grey[50]
                           : t.palette.grey[900],
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                  }}
               />
               <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  component={Paper}
                  elevation={6}
                  square
               >
                  <Box
                     sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                     }}
                  >
                     <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                     </Avatar>
                     <Typography component="h1" variant="h5">
                        Sign in to SODO Website
                     </Typography>
                     <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                     >
                        <TextField
                           type="text"
                           fullWidth
                           label="UserName"
                           placeholder="UserName"
                           variant="outlined"
                           onChange={(e) =>
                              setValues({
                                 ...values,
                                 username: e.target.value,
                              })
                           }
                        />
                        <TextField
                           type={values.showPass ? "text" : "password"}
                           fullWidth
                           label="Password"
                           placeholder="Password"
                           variant="outlined"
                           onChange={(e) =>
                              setValues({
                                 ...values,
                                 password: e.target.value,
                              })
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
                        <Button
                           type="submit"
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                        >
                           Sign In
                        </Button>
                        <Copyright sx={{ mt: 5 }} />
                     </Box>
                  </Box>
               </Grid>
            </Grid>
         </ThemeProvider>
      </div>
   );
}
