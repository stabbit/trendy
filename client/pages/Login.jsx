import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { displayName, setDisplayName, isLoggedIn, setLoggedIn } = useOutletContext();
  const [validLogin, setValidLogin] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log('----------------', username, password)
        if (userData.status !== 401) {
          setDisplayName(userData.username)
          localStorage.setItem('jwt', userData.accessToken)
          setLoggedIn(true);
          console.log(userData)
          navigate('/', { state: { user: userData } });
        } // jimmy is afraid of oauth
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
        setValidLogin(false)
      });
  };

  // OAuth
  function handleCallbackResponse (res) {
    const userObject = jwt_decode(res.credential)
    setDisplayName(userObject.given_name);
    localStorage.setItem('jwt', res.credential)
    setLoggedIn(true);
    navigate('/', { state: { user: { username: displayName, accessToken: res.credential } }})
    // userObject.picture - profile picture

  };

  useEffect(() => {
    /* global google defined in index.html */
    google.accounts.id.initialize({
      client_id: "921926110672-7as5q64ofj723hj7c09h8e3obbcspk54.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("googOAUTH"),
      { theme: "outline", size: "large"}
    );
    // google.accounts.id.prompt();
  }, []);



  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <TextField id="standard-basic" label="Username" variant="standard" onChange={handleUsernameChange} value={username} sx={{marginRight: 1}} required />
        <TextField id="standard-basic1" label="Password" variant="standard" onChange={handlePasswordChange} type='password' sx={{marginRight: 1}} required />
        <Button className="login-button" type="submit" variant="outlined" sc={{margin: 10}} >Login</Button>
      </form>
      {validLogin === false ? <p className='error-message'>Invalid login credentials</p> : null}
      <div id='googOAUTH' />
      <a href='' className='signup-redirect' onClick={() => navigate('/signup')}>Create an Account</a>
    </div>
  );
}
