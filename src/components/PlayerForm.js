import { useState } from "react";
import "./PlayerForm.css";

const PlayerForm = ({ handleForm }) => {
  const [playersNumber, setPlayersNumber] = useState("1");
  const [next, setNext] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    if (playersNumber === "1") {
      setSubmitted(true);
      handleForm({ firstName, secondName });
    } else {
      setNext(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleForm({ firstName, secondName });
    setSubmitted(true);
  };

  if (!submitted) {
    return (
      <div className="player-form">
        <div className="modal">
          {!next && (
            <div>
              <h2>Select number of players</h2>
              <label>
                <span>One player</span>
                <input
                  type="radio"
                  name="player"
                  value="1"
                  checked={playersNumber === "1"}
                  onChange={(e) => setPlayersNumber(e.target.value)}
                />
              </label>

              <label>
                <span>Two players</span>
                <input
                  type="radio"
                  name="player"
                  value="2"
                  checked={playersNumber === "2"}
                  onChange={(e) => setPlayersNumber(e.target.value)}
                />
              </label>
              <br />
              <button onClick={handleClick}>Next</button>
            </div>
          )}
          {next && (
            <form onSubmit={handleSubmit}>
              <label>
                <span>Player one name:</span>
                <input
                  type="text"
                  placeholder="type name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  maxLength="6"
                />
              </label>
              <label>
                <span>Player two name:</span>
                <input
                  type="text"
                  placeholder="type name"
                  required
                  onChange={(e) => setSecondName(e.target.value)}
                  value={secondName}
                  maxLength="6"
                />
              </label>
              <button>Sumbit</button>
            </form>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PlayerForm;
