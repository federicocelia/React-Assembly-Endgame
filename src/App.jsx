import { useState } from "react";
import clsx from "clsx";
import Header from "../src/components/Header.jsx";
import GameStatus from "./components/GameStatus.jsx";
import { languages } from "./languages.js";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(event) {
    const letter = event.currentTarget.id;
    setGuessedLetters((prevLetters) => {
      if (prevLetters.includes(letter)) {
        return prevLetters;
      } else {
        return [...prevLetters, letter];
      }
    });
  }

  const keyboardElement = alphabet
    .toUpperCase()
    .split("")
    .map((letter) => {
      const isGuessed = guessedLetters.includes(letter);
      const isCorrect = isGuessed && currentWord.toUpperCase().includes(letter);
      return (
        <button
          key={letter}
          id={letter}
          onClick={addGuessedLetter}
          className={clsx("key-letter", {
            rightKey: isGuessed && isCorrect,
            wrongKey: isGuessed && !isCorrect,
          })}
        >
          {letter}
        </button>
      );
    });

  const lettersArray = [...currentWord.toUpperCase()];

  const lettersElement = lettersArray.map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    return (
      <span key={index} className="letter">
        {isGuessed ? letter : ""}
      </span>
    );
  });

  const languageElement = languages.map((language) => {
    const style = {
      backgroundColor: `${language.backgroundColor}`,
      color: `${language.color}`,
    };
    return (
      <p key={language.name} className="language" style={style}>
        {language.name}
      </p>
    );
  });

  return (
    <main>
      <Header />
      <GameStatus />
      <div className="languages-section">{languageElement}</div>
      <div className="letters-section">{lettersElement}</div>
      <section className="keyboard">{keyboardElement}</section>
      <button className="new-game-btn">New Game</button>
    </main>
  );
}
