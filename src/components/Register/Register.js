import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import {
   Button,
   Container,
   FormControlLabel,
   Grid,
   Link,
   Paper,
   TextField,
   IconButton,
   InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Register() {
   // const [url, setUrl] = useState(
   //    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWqDr1l-AlEfIK_Uj2LSeTUqOibf_dLjoluQ&usqp=CAU"
   // );
   // const [register, setRegister] = useForm();
   // const[avatar, setAvatar] = useState("")

   // const changeAvatar = (e) =>{
   //    setUrl(URL.createObjectURL(e.target.files[0]));
   // }

   const navigate = useNavigate();
   const [values, setValues] = useState({
      email: "",
      pass: "",
      showPass: false,
   });
   const handleSubmit = (e) => {
      e.preventDefault();
      axios
         .post("https://reqres.in/api/register", {
            email: values.email,
            password: values.pass,
         })
         // .then((res) => localStorage.setItem("token", res.data.token))
         .then((res) => navigate("/login"))
         .catch((err) => console.error(err));
   };

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
               {/* <Avatar alt="" src={url} container padding="10px" />
               <Grid item>
                  <TextField
                 type="file"
                 accept="image/*"
                 onChange={(e) =>setUrl(URL.createObjectURL(e.target.files[0]))}
  
                 />
               </Grid> */}
               <Paper elevation={2} sx={{ padding: 5 }}>
                  <form onSubmit={handleSubmit}>
                     <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                     >
                        <Grid item xs={12}>
                           <TextField
                              type="email"
                              fullWidth
                              label="Email Address"
                              placeholder="Email Address"
                              variant="outlined"
                              onChange={(e) =>
                                 setValues({ ...values, email: e.target.value })
                              }
                           />
                        </Grid>

                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                           <TextField
                              type="passWord"
                              fullWidth
                              label="Password"
                              placeholder="Password"
                              variant="outlined"
                              onChange={(e) =>
                                 setValues({ ...values, pass: e.target.value })
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
                        <Grid item xs={12}>
                           <FormControlLabel
                              control={<Checkbox default />}
                              label="I want to receive inspiration, marketing promotions and updates via email."
                           />
                        </Grid>

                        <Grid item xs={12}>
                           <Button type="submit" variant="contained" fullWidth>
                              Sign Up
                           </Button>
                        </Grid>
                        <Grid item xs={12}>
                           <Link
                              href="login"
                              underline="none"
                              textAlign="right"
                           >
                              {"Already have an account? Sign in"}
                           </Link>
                        </Grid>
                     </Grid>
                  </form>
               </Paper>
            </Grid>
         </Container>
      </div>
   );
}

export default Register;
