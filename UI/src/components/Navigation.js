import React from 'react';
 
import { NavLink } from 'react-router-dom';
import './Navigation.css'
 
const Navigation = (props) => {
  let isAuth = props.isAuth;
    return (
       <div className="navbar-basic">
       <strong className="titleText">Tramd19</strong>
        <div className="menus">
            <NavLink to="/rider" className="menuItem">RiderForm</NavLink>
            <NavLink to="/verify_ride" className="menuItem">VERIFY RIDE</NavLink>
            {!isAuth && <NavLink to="/signin" className="menuItem">OFFICIAL Login</NavLink>}
            {isAuth && <NavLink to="/dashboard" className="menuItem">OFFICIAL Dashboard</NavLink>}
            {isAuth && <NavLink to="/logout" className="menuItem">Logout</NavLink>}

        </div>
         
           
      </div>
    );
}
 
export default Navigation;