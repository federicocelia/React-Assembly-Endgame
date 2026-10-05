import { getFarewellText } from "../utils.js";

export default function GameStatus(props) {
  function renderGameStatus() {
    if (props.isGameLost) {
      return (
        <>
          <h2 className="game-status-title">Game over!</h2>
          <p className="game-status-text">
            You lose! Better start learning Assembly 😭
          </p>
        </>
      );
    }

    if (props.isGameWon) {
      return (
        <>
          <h2 className="game-status-title">You win!</h2>
          <p className="game-status-text">Well done! 🎉</p>
        </>
      );
    }

    if (props.farewellLanguage) {
      return (
        <>
          <h2 className="game-status-title">
            {getFarewellText(props.farewellLanguage)} 🫡
          </h2>
        </>
      );
    }

    return null;
  }

  const style = {
    backgroundColor: props.isGameWon
      ? "var(--game-status-background-win)"
      : props.isGameLost
        ? "var(--game-status-background-loss)"
        : "var(--game-status-background-playing)",
  };

  const statusContent = renderGameStatus();
  if (!statusContent) {
    return null;
  }
  return (
    <div className="game-status-section" style={style}>
      {statusContent}
    </div>
  );
}
