import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [password, setPassword] = useState('');
  const { displayName, setDisplayName, isLoggedIn, setLoggedIn } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 409) {
          setLoggedIn(false);
          return undefined
        } else {
          setDisplayName(username);
          setLoggedIn(true);
          return response.json();
        }
      })
      .then((username) => {
        if (username) {
          localStorage.setItem('jwt', username.accessToken)
          navigate('/', { state: { user: { username: username.username, accessToken: username.accessToken } } } )
        }
        else setUsernameTaken(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <TextField id="standard-basic" label="Username" variant="standard" onChange={handleUsernameChange} value={username} sx={{marginRight: 1}} required />
        <TextField id="standard-basic" label="Password" variant="standard" onChange={handlePasswordChange} type='password' sx={{marginRight: 1}} required />
        <Button className="login-button" type="submit" variant="outlined" sc={{margin: 10}} >Sign Up</Button>
      </form>
      {usernameTaken === true ? <p className='error-message'>{username} is currently taken!</p> : null}
      <a href='' className='login-redirect' onClick={() => navigate('/login')}>Login Page</a>
    </div>
  );
}