import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export function ConfettiSection() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}
