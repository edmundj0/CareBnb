import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage/SignupForm';
import SearchBar from './SearchBar';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  //if user clicks signup, flip login to false
  const [login, setLogin] = useState(true);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <SignupFormModal />
  //     </>
  //   );
  // }

  return (
    <div className='nav-total-container'>
      <div className='nav-left-side'>
        <NavLink exact to="/"><img id='main-logo' src="https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/Carebnb-logo.png" alt="logo-img" /></NavLink>
      </div>
      <div className='nav-search-bar-container'>
        <SearchBar />
      </div>
      <div className="nav-right-side">

        {sessionUser ?
          <NavLink to="/about-me/spots/new" style={{ textDecoration: 'none' }}><span id='host-spot-button'>Become a Host</span></NavLink> : null
        }

        {/* thread in props, want profile button to be able to control whether modal pops or not */}
        {isLoaded && <ProfileButton user={sessionUser} setLogin={setLogin} setShowModal={setShowModal} />}
        {/* if you click background, now onClose prop will trigger */}
        {showModal && (<Modal onClose={() => setShowModal(false)}>
          {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
        </Modal>)}

      </div>
    </div>
  );
}


export default Navigation;
