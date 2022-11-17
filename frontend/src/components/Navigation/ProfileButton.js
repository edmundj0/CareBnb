import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css'


function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <button onClick={openMenu} id="menu-nav-button">
      <i className="fas fa-bars" />
      <i className="fas fa-user" />
    </button>
    {showMenu && ( user ?
      (<ul className="profile-dropdown">
        <li className="profile-dropdown-li profile-bold-text">{user.username}</li>
        <li className="profile-dropdown-li reviews-li profile-bold-text">{user.email}</li>
        <li className="profile-dropdown-li dropdown-hover"><NavLink to="/about-me/spots" style={{textDecoration: 'none'}}><button className="manage-spots-reviews-button">Manage My Spots</button></NavLink></li>
        <li className="profile-dropdown-li reviews-li dropdown-hover"><NavLink to="/about-me/reviews" style={{textDecoration: 'none'}}><button className="manage-spots-reviews-button">Manage My Reviews</button></NavLink></li>
        <li className="profile-dropdown-li">
          <button id="logout-button" onClick={logout}>Log Out</button>
        </li>
      </ul>) :
      ( <ul className="profile-dropdown">
        <li>
          <button className="login-signup-buttons" onClick={()=> {
            setLogin(true)
            setShowModal(true)
          }}>Log In</button>
        </li>
        <li>
          <button className="login-signup-buttons" onClick={() => {
            setLogin(false)
            setShowModal(true)
          }}>Sign Up</button>
        </li>
      </ul>

      )
    )}
    </>



    // <>
    //   <button onClick={openMenu}>
    //     <i className="fas fa-user-circle" />
    //     &nbsp;My Account
    //     {/* fas fa-user-circle */}
    //   </button>
    //   {showMenu && (
    //     <div>
    //       <div>{user.username}</div>
    //       <div>{user.email}</div>
    //       <div>
    //         <NavLink to="/about-me/spots">
    //         <button>My Spots</button>
    //         </NavLink>
    //       </div>
    //       <div>
    //         <NavLink to="/about-me/reviews">My Reviews</NavLink>
    //       </div>
    //       <button onClick={logout}>Log Out</button>
    //     </div>
    //     // <ul className="profile-dropdown">
    //     //   <li>{user.username}</li>
    //     //   <li>{user.email}</li>
    //     //   <li>
    //     //     <button onClick={logout}>Log Out</button>
    //     //   </li>
    //     // </ul>
    //   )}
    // </>
  );
}

export default ProfileButton;
