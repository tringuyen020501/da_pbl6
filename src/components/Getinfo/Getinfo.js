import React, { useContext } from "react";
import { UserContext } from "../../App";

function Getinfo() {
   const [info] = useContext(UserContext);
   return (
      <div>
         {"owner: " + "  " + JSON.stringify(info.owner)}
         <br />
         {"land_number: " + "  " + JSON.stringify(info.land_number)}
         <br />
         {"area: " + "  " + JSON.stringify(info.area)}
         <br />
         {"uses: " + "  " + JSON.stringify(info.uses)}
         <br />
         {"Note: " + "  " + JSON.stringify(info.Note)}
         <Button variant="contained" onClick={saveInfo}>
            Contained
         </Button>
      </div>
   );
}
export default Getinfo;
