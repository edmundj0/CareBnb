import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/FrontPage";
import SpotPage from "./components/SpotPage";
import UserManageSpots from "./components/UserManageSpots";
import UserEditSpot from "./components/UserEditSpot";
import UserNewSpot from "./components/UserNewSpot";


function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <h1>Hello from App</h1>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotPage />
          </Route>
          <Route exact path= "/about-me/spots">
            <UserManageSpots />
          </Route>
          <Route exact path = "/about-me/spots/:spotId/edit">
            <UserEditSpot />
          </Route>
          <Route exact path= "/about-me/spots/new">
            <UserNewSpot />
          </Route>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
