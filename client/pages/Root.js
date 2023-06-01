import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
// Outlet: used to render the child components based on the current route.
// serves as a placeholder where the matched child components will be rendered
import Navbar from '../components/Navbar'
import jwt_decode from "jwt-decode";

export default function Root() {
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(null);
  // Using json web tokens for keeping track of the session. isLoggedIn is set to false on click inside of Navbar. The JWT will be set inside of Login and Signup and will be accessible inside of the localStorage.
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      setLoggedIn(true);
      const decodedToken = jwt_decode(token)
      console.log(decodedToken.username)
      setDisplayName(decodedToken.username)
    }
  }, isLoggedIn)

  return (
    <>
      <Navbar displayName={[displayName, setDisplayName]} isLoggedIn={[isLoggedIn, setLoggedIn]} />
      <div className="main-container">
        <Outlet context={{ displayName, setDisplayName, isLoggedIn, setLoggedIn }}></Outlet>
      </div>
    </>
  );
}

