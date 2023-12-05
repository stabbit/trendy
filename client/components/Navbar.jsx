import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import jwt_decode from "jwt-decode";

export default function Navbar({displayName, isLoggedIn, location, interest, radius}) {
  //displayName and isLoggedIn are currently an array. 
  // Index 0 = Value
  // Index 1 = Function
  // const [location, setLocation] = useState("");
  // const [interest, setInterest] = useState("");
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const navigate = useNavigate();
  
  let userPic;
  const token = localStorage.getItem('jwt')
  if (token) {
    const decodedToken = jwt_decode(token)
    userPic = decodedToken.picture
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      location: location[0],
      interest: interest[0],
      radius: radius[0],
    };
    navigate("/main", { state: { ...formData } });
  };
  
  const handleLocationChange = (event) => location[1](event.target.value);
  const handleInterestChange = (event) => interest[1](event.target.value);
  const handleRadiusChange = (event) => radius[1](event.target.value);

  const showPosition = (response) => {
    let lat = response.coords.latitude;
    let long = response.coords.longitude;
    setLat(lat)
    setLong(long)
  }
  
  const handlePosition = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((showPosition))
  }
  
  const handleLoginClick = () => {
    if (!isLoggedIn[0]) navigate('/login');
    else {
      isLoggedIn[1](false);
      localStorage.removeItem('jwt');
      navigate('/');
    }
  }

  return (
    <div className="Navbar">
      <div>
        <h1 className="trendy-logo" onClick={() => navigate('/')}>TRENDY</h1>
      </div>
      <div>
        <form className="navForm" onSubmit={ handleSubmit }>
          <div style={{display: "flex"}}>
          <TextField value={location[0]} onChange={handleLocationChange} id="standard-basic2" label="Location" variant="standard" sx={{marginRight: 1}}  ></TextField>
          <TextField value={interest[0]} onChange={handleInterestChange} id="standard-basic3" label="Interest" variant="standard" sx={{ marginRight: 1 }} ></TextField>
          </div>
          <div>
          <FormControl sx={{marginRight: 1}} size="small">
            <InputLabel>Radius</InputLabel>
            <Select id="simple-select" value={radius[0]} label="Radius" onChange={handleRadiusChange}>
              <MenuItem value={"8050"}>5 Miles</MenuItem>
              <MenuItem value={ "16100" }>10 Miles</MenuItem>
              <MenuItem value={ "32200" }>20 Miles</MenuItem>
            </Select>
            </FormControl>
            <Button className="navbar-submit-button" type="submit" variant="outlined" >Submit</Button>
          </div> 
        </form>
      </div>
      <div>
        <span className="userControls">
          {isLoggedIn[0] === true 
              ? (userPic 
                ? (<span className="center"> <img className="profile-pic" src={userPic}></img><IconButton aria-label="add to favorites" onClick={() => navigate('/favs')} className="favoriteIcon"><FavoriteIcon /></IconButton> </span>)
                : (<span> <span className="userIcon">{displayName[0][0].toUpperCase()}</span> <IconButton aria-label="add to favorites" onClick={() => navigate('/favs')} className="favoriteIcon"><FavoriteIcon /></IconButton> </span>)) 
              : null}

          <Button className="navbar-login" onClick={handleLoginClick} type="submit" variant="contained">{ !isLoggedIn[0] ? 'Login' : 'Logout' }</Button>
        </span>
      </div>
    </div>
  );
}