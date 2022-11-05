import React, { useContext, useEffect, useState } from "react";
import { AppContext, UserContext } from "../../App";
import { Button, TextField } from "@mui/material";

function Getinfo() {
   const [info] = useContext(UserContext);
   const [activeStep, setActiveStep] = useContext(AppContext);

   const [user, setUser] = useState({
      owner: info?.owner,
      landNumber: info?.land_number,
      area: info?.area,
      uses: info?.uses,
      note: info?.Note,
   });

   useEffect(() => {
      setUser({
         owner: info?.owner,
         landNumber: info?.land_number,
         area: info?.area,
         uses: info?.uses,
         note: info?.Note,
      });
   }, [info]);

   const handleSave = () => {
      console.log({ user });
      setActiveStep((s) => s + 1);
   };

   const handleChange = (e) => {
      setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
   };
   return (
      <div>
         <TextField
            sx={{ marginRight: 1 }}
            label="Owner"
            name={"owner"}
            value={user?.owner}
            onChange={handleChange}
         />
         <TextField
            sx={{ marginRight: 1 }}
            label="Land Number"
            name={"landNumber"}
            value={user?.landNumber}
            onChange={handleChange}
         />
         <TextField
            sx={{ marginRight: 1 }}
            label="Area"
            name={"area"}
            value={user?.area}
            onChange={handleChange}
         />
         <TextField
            sx={{ marginRight: 1 }}
            label="Uses"
            name={"uses"}
            value={user?.uses}
            onChange={handleChange}
         />
         <TextField
            label="Note"
            name={"note"}
            value={user?.note}
            onChange={handleChange}
         />
         <br />
         <Button
            variant="contained"
            sx={{ marginTop: 3, width: 100 }}
            onClick={handleSave}
         >
            Save
         </Button>
      </div>
   );
}
export default Getinfo;
