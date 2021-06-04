import "../assets/css/navbar.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const { logout, isAuthenticated } = useAuth0();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/" exact>
          <font size="5" color="white">
            KSEA Proposal
          </font>
        </NavLink>
      </div>
      {isAuthenticated && (
        <div className="header-right">
          <div className="btn-group" style={{ marginRight: "150px" }}>
            <button onClick={() => logout()} className="btn btn-info">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
