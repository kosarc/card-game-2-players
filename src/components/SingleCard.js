import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="single-card">
      <div className={flipped ? "card-flipped" : ""}>
        <img src={card.src} alt="fornt-card" className="front" />
        <img
          src="/img/cover2.png"
          alt="back-card"
          className="back"
          onClick={handleClick}
        />
      </div>
      <div></div>
    </div>
  );
};

export default SingleCard;
