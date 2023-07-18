import { useEffect, useState } from "react";
import "./App.css";
import PlayerForm from "./components/PlayerForm";
import SingleCard from "./components/SingleCard";
import { usePlayer } from "./hooks/usePlayer";

const images = [
  { src: "/img/clubs_ace.png" },
  { src: "/img/clubs_king.png" },
  { src: "/img/clubs_queen.png" },
  { src: "/img/clubs_jack.png" },
  { src: "/img/diamonds_ace.png" },
  { src: "/img/diamonds_king.png" },
  { src: "/img/diamonds_queen.png" },
  { src: "/img/diamonds_jack.png" },
  { src: "/img/hearts_ace.png" },
  { src: "/img/hearts_king.png" },
  { src: "/img/hearts_queen.png" },
  { src: "/img/hearts_jack.png" },
  { src: "/img/joker_black.png" },
  { src: "/img/joker_red.png" },
  { src: "/img/spades_king.png" },
  { src: "/img/spades_queen.png" },
  { src: "/img/spades_jack.png" },
  { src: "/img/spades_ace.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [playerOneMatch, setPlayerOneMatch] = useState(0);
  const [playerTwoMatch, setPlayerTwoMatch] = useState(0);
  const [firstPlayer, setFirstPlayer] = useState(null);
  const [secondPlayer, setSecondPlayer] = useState(null);

  const { player, changePlayer } = usePlayer();

  const handleClick = () => {
    const shuffledImages = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random(), match: false };
      });

    setCards(shuffledImages);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    changePlayer("first");
    setPlayerOneMatch(0);
    setPlayerTwoMatch(0);
  };

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const handleForm = ({ firstName, secondName }) => {
    if (firstName === "") {
      return handleClick();
    }
    setFirstPlayer(firstName);
    setSecondPlayer(secondName);
    handleClick();
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    const checkPlayer = () => {
      checkPlayer: {
        if (choiceOne && choiceTwo) {
          setDisabled(true);
          setTurns((prevTurns) => prevTurns + 1);
          if (
            choiceOne.src === choiceTwo.src &&
            choiceOne.id !== choiceTwo.id
          ) {
            player === "first"
              ? setPlayerOneMatch((prev) => prev + 1)
              : setPlayerTwoMatch((prev) => prev + 1);

            setCards((prevCards) => {
              return prevCards.map((card) => {
                if (card.src === choiceOne.src) {
                  return { ...card, match: true };
                } else {
                  return { ...card };
                }
              });
            });
            setTimeout(() => resetChoices(), 1000);
            break checkPlayer;
          }

          player === "first" ? changePlayer("second") : changePlayer("first");
          setTimeout(() => resetChoices(), 1000);
        }
      }
    };
    checkPlayer();
  }, [choiceOne, choiceTwo]);

  const handleReload = () => {
    window.location.reload();
  };

  console.log(player);

  return (
    <div className="App">
      <PlayerForm handleForm={handleForm} />
      <div>
        <button onClick={handleClick}>New Game</button>
        <button onClick={handleReload} className="refresh">
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>

      {firstPlayer != null && (
        <div className="players">
          <div className={`player ${player === "first" ? "first" : ""}`}>
            {firstPlayer} |{playerOneMatch}|
          </div>
          <div className={`playerr ${player === "second" ? "second" : ""}`}>
            {secondPlayer} |{playerTwoMatch}|
          </div>
        </div>
      )}
      <div className="desk-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.match}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default App;
