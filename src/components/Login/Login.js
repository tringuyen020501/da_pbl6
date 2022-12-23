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
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Login() {
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
         .then((values) => {
            localStorage.setItem("access_token", values.access_token);
            console.log(values);
            // if(result.role==="1"){
            //    navigate("/admin");

            // }
            // else(result.role==="0"){
            //    navigate("/user");
            // }
            navigate("/admin");
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
      <div className="Menu">
         <header className="Menu-header">
            <h1 className="Menu-title">Login</h1>
         </header>
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
                              type="text"
                              fullWidth
                              label="username "
                              placeholder="username Address"
                              variant="outlined"
                              onChange={
                                 (e) =>
                                    setValues({
                                       ...values,
                                       username: e.target.value,
                                    })
                                 // setValues({ username: e.target.value })
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
