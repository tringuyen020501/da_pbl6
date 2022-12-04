import React, { useState } from "react";
import "../Navbar/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
   const [user] = useState(null);
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
                     Hi, <span> {user} </span>{" "}
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
                  <Link to="/admin" className="navbar-register">
                     {" "}
                     Admin
                  </Link>
               </>
            )}
         </nav>
      </div>
   );
}

export default Navbar;
