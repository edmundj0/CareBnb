import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
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
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
        &nbsp;My Account
        {/* fas fa-user-circle */}
      </button>
      {showMenu && (
        <div>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <NavLink to="/about-me/spots">
            <button>My Spots</button>
            </NavLink>
          </div>
          <div>
            <NavLink to="/about-me/reviews">My Reviews</NavLink>
          </div>
          <button onClick={logout}>Log Out</button>
        </div>
        // <ul className="profile-dropdown">
        //   <li>{user.username}</li>
        //   <li>{user.email}</li>
        //   <li>
        //     <button onClick={logout}>Log Out</button>
        //   </li>
        // </ul>
      )}
    </>
  );
}

export default ProfileButton;
