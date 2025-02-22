import React from "react";
import { useOutletContext } from "react-router-dom";
import Slider from "react-slick";
import AppCard from "../components/AppCard.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Slick Carousel:  jQuery-based carousel/slider plugin that provides a flexible and 
// customizable solution for creating image carousels, sliders, and other content sliders on websites.

export default function Carousel(props){
  const { displayName} = useOutletContext();
  
    const settings = {
      arrows: true,
      dots: true,
      centerMode: true,
      className: "carousel",
      infinite: true,
      centerPadding: "30px",
      speed: 100,

      slidesToShow: 4,
      slidesToScroll: 1,
      step: 0,
      // adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 5
          }
        },
      ]
    };
  
    // implement truncateLink or delete
    // Shortening the links
    const truncateLink = (url) => {
      const maxLength = 40; // Maximum length of the displayed link
      if (url.length > maxLength) {
        return url.substring(0, maxLength) + "...";
      }
      return url;
    };
  
    const cardsJSX = props.data.map((card, index) => (
      <div className="cardInCarousel" key={`card${index}`}>
        <AppCard
          key={index}
          title={card.name}
          image={card.image_url}
          description={card.categories
            .map((category) => category.title)
            .join(", ")}
          address={card.location.join(", ")}
          score={Math.round(card.averageScore * 100)}
          url={card.url}
          apiId={card.id}
          username={displayName}
        />
      </div>
    ));
    
    return (
      <div className="cardContainer">
        <h2> Results </h2>
          <Slider {...settings}> {cardsJSX} </Slider>
      </div>
    );
  }
  