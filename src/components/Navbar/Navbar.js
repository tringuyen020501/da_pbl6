import React, { useState } from "react";
import "../Navbar/navbar.css";
import { Link } from "react-router-dom";


function Navbar() {
   const [user, setUSer] = useState(null);
   return (
      <div>
         <nav className="navbar-container">
            <Link to="/" className="navbar-home">
               {" "}
               Home{" "}
            </Link>
            {user ? (
               <>
                  <p className="navbar-user">
                     Hi, <span>  </span>{" "}
                  </p>
                  <Link to="/logout" className="navbar-logout">
                     {" "}
                     Log out
                  </Link>
               </>
            ) : (
               <>
                  <Link to="/login" className="navbar-login">
                     {" "}
                     Login{" "}
                  </Link>
                  <Link to="/register" className="navbar-register">
                     {" "}
                     Register
                  </Link>
               </>
            )}
         </nav>
      </div>
   );
}

export default Navbar;
