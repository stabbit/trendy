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

export default function Navbar({displayName, isLoggedIn}) {
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState("");
  const [radius, setRadius] = useState("8050"); // radius takes in meters
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      location,
      interest,
      radius,
    };
    navigate("/main", { state: { ...formData } });
  };
  
  // turn handle into one function
  // add name/id attribute to input fields (location, interest, radius)
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleInterestChange = (event) => setInterest(event.target.value);
  const handleRadiusChange = (event) => setRadius(event.target.value);

  const handleLoginClick = () => {
    if (!isLoggedIn[0]) navigate('/login');
    else {
      isLoggedIn[1](false);
      console.log(isLoggedIn)
      localStorage.removeItem('jwt');
      navigate('/');
    }
  }
  return (
    <div className="Navbar">
      <div>
        <span><h1 onClick={() => navigate('/')}>TRENDY</h1></span>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="navbar-submit">
          <TextField value={location} onChange={handleLocationChange} id="standard-basic2" label="Location" variant="standard" sx={{marginRight: 1}}  ></TextField>
          <TextField value={interest} onChange={handleInterestChange} id="standard-basic3" label="Interest" variant="standard" sx={{marginRight: 1}} ></TextField>
          <FormControl sx={{marginRight: 1}} size="small">
            <InputLabel >Radius</InputLabel>
            <Select id="simple-select" value={radius} label="Radius" onChange={handleRadiusChange}>
              <MenuItem value={"8050"}>5 Miles</MenuItem>
              <MenuItem value={ "16100" }>10 Miles</MenuItem>
              <MenuItem value={ "32200" }>20 Miles</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="outlined" sx={{height: 45.75}} >Submit</Button>
        </form>
      </div>
      <div>
        <span>
          {isLoggedIn[0] === true ? (<span>{displayName[0].toUpperCase()} <IconButton aria-label="add to favorites" onClick={() => navigate('/favs')} className="favoriteIcon"><FavoriteIcon /></IconButton> </span>) : null}
          <Button onClick={handleLoginClick} type="submit" variant="contained"  sx={{height: 45.75}}>{ !isLoggedIn[0] ? 'Login' : 'Logout' }</Button>
        </span>
      </div>
    </div>
  );
}
