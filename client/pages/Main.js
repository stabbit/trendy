import Carousel from "../containers/Carousel";
import AppCard from "../components/AppCard"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Main() {
  let location = useLocation();
  const { responseData } = location.state;
  const [cards, setCards] = useState([]); // Use state to store the cards

  useEffect(() => {
    const cardElements = responseData.map((card, index) => (
      <div key={index} className="card">
        <h1>{card.name}</h1>
        <p>Score: {Math.round(card.averageScore * 100)}</p>
        <p>Category: {card.categories[0].title}</p>
        <p>Address: {card.location[0]}</p>
        <p>{truncateLink(card.url)}</p>
        <img src={card.image_url}/>
      </div>
    ));

    setCards(cardElements); // Update the state with the generated cards
  }, [responseData]);

  const truncateLink = (url) => {
    const maxLength = 30; // Maximum length of the displayed link
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + "...";
    }
    return url;
  };

  return (
    <div>
      <h1>Main</h1>
      <div className="cardDisplay">
        {cards}
      </div>
    </div>
  );
}