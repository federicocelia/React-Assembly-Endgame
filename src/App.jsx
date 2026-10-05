import { useState, useEffect } from "react";
import clsx from "clsx";
import Header from "../src/components/Header.jsx";
import GameStatus from "../src/components/GameStatus.jsx";
import { ConfettiSection } from "./components/ConfettiSection.jsx";
import { languages } from "./languages.js";
import { randomWord } from "./utils.js";

export default function App() {
  //state values
  const [currentWord, setCurrentWord] = useState(() => randomWord());
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

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];

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
          disabled={isGameOver}
          aria-disabled={isGameOver}
          aria-label={`letter: ${letter}`}
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
    const isCorrect = guessedLetters.includes(letter);
    const className = clsx("letter", {
      guessedLetter: isCorrect && isGameOver,
      notGuessedLetter: !isCorrect && isGameOver,
    });

    return (
      <span key={index} className={className}>
        {isCorrect ? letter : isGameOver ? letter : ""}
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

  function resetGame() {
    setCurrentWord(() => randomWord());
    setGuessedLetters([]);
  }
  return (
    <div className="winGame">
      {isGameWon ? <ConfettiSection /> : null}
      <main>
        <Header />
        <GameStatus
          aria-live="polite"
          role="status"
          isGameOver={isGameOver}
          isGameWon={isGameWon}
          isGameLost={isGameOver && !isGameWon}
          farewellLanguage={farewellLanguage}
        />
        <div className="languages-section">{languageElement}</div>
        <div className="letters-section">{lettersElement}</div>
        {/* Combined visually-hidden aria-live region for status updates */}
        <section className="sr-only" aria-live="polite" role="status">
          <p>
            {currentWord.includes(lastGuessedLetter)
              ? `Correct! The letter ${lastGuessedLetter} is in the word.`
              : `Sorry! The letter ${lastGuessedLetter} is not in the word.`}
            You have {`${languages.length - wrongGuessCount}`} attempt
            {languages.length - wrongGuessCount > 1 ? `s` : ""} left.
          </p>

          <p>
            Current word:
            {currentWord
              .toUpperCase()
              .split("")
              .map((letter) =>
                guessedLetters.includes(letter) ? letter : "blank",
              )
              .join(" ")}
          </p>
        </section>
        <section className="keyboard">{keyboardElement}</section>
        {isGameOver ? (
          <button className="new-game-btn" onClick={() => resetGame()}>
            New Game
          </button>
        ) : null}
      </main>
    </div>
  );
}
