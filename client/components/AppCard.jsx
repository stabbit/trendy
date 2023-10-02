import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
// MUI = Material-UI, is a popular open-source user interface (UI) library for building web applications with React.js
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';


import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Transitions = MUI
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// encodeURIComponent = built-in JavaScript function that is used to encode a URI component.
// Used to encode the shareUrl variable before it is appended to the Facebook sharing URL
// Add social media sharing buttons in the future.
// Right now, button will open the original yelp posting (props.url)
const ShareButton = ({ shareUrl }) => {
  const handleShareClick = () => {
    // const socialMediaUrls = {
    //   facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    //   twitter: `https://twitter.com/share?url=${encodeURIComponent(shareUrl)}`,
    //   linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`,
    // };
    window.open(shareUrl);
  };

  return (
    <IconButton aria-label="share" onClick={handleShareClick}>
      <ShareIcon />
    </IconButton>
  );
};

export default function AppCard(props) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { displayName, setDisplayName, isLoggedIn, setLoggedIn } = useOutletContext();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log('this is the props you\'re looking for',props)
  // need a post request 
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    fetch('/api/fav', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  };
  console.log(props.url);
  return (
    <Card sx={{ maxWidth: 325, height: '100%' }}>
      {/* sx prop overrides/defines additional styling */}
      
      <CardHeader
        sx={{ height: '100%' }}
        title={props.title}
        subheader={props.score}
      />
      <CardMedia component="img" height="30%" image={props.image} alt="Business Image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleFavoriteClick} aria-label="add to favorites">
          {isFavorite ? (
            <FavoriteIcon sx={{ color: red[500] }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <ShareButton shareUrl={props.url} /> {/* Pass the share URL as a prop */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Info:</Typography>
          <Typography paragraph>
            Address: {props.address}
            
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>
  );
}
