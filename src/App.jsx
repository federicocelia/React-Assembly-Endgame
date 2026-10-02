import Header from "../src/components/Header.jsx";
import GameStatus from "./components/GameStatus.jsx";
import { languages } from "./languages.js";

export default function AssemblyEndgame() {
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
    </main>
  );
}
