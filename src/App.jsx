import { useState } from "react";
import Header from "../src/components/Header.jsx";
import GameStatus from "./components/GameStatus.jsx";
import { languages } from "./languages.js";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");

  const lettersArray = [...currentWord.toUpperCase()];

  const lettersElement = lettersArray.map((letter, index) => {
    return (
      <span key={index} className="letter">
        {letter}
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
    </main>
  );
}
