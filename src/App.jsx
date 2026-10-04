import { useState, useEffect } from "react";
import clsx from "clsx";
import Header from "../src/components/Header.jsx";
import GameStatus from "./components/GameStatus.jsx";
import { languages } from "./languages.js";

export default function App() {
  //state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Static variable
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.toUpperCase().includes(letter),
  ).length;

  const isGameWon = currentWord
    .toUpperCase()
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameOver = wrongGuessCount === languages.length || isGameWon;

  const farewellLanguage =
    wrongGuessCount > 0 ? languages[wrongGuessCount - 1].name : null;

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

  const languageElement = languages.map((language, index) => {
    const style = {
      backgroundColor: `${language.backgroundColor}`,
      color: `${language.color}`,
    };
    return (
      <p
        key={language.name}
        className={clsx("language", {
          lost: index < wrongGuessCount,
        })}
        style={style}
      >
        {language.name}
      </p>
    );
  });

  return (
    <main>
      <Header />
      <GameStatus
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        isGameLost={isGameOver && !isGameWon}
        farewellLanguage={farewellLanguage}
      />
      <div className="languages-section">{languageElement}</div>
      <div className="letters-section">{lettersElement}</div>
      <section className="keyboard">{keyboardElement}</section>
      {isGameOver ? <button className="new-game-btn">New Game</button> : null}
    </main>
  );
}
