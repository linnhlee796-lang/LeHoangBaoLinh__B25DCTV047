import useClock from "../hooks/useClock.js";

function Clock() {
  const now = useClock();
  return <span className="clock">{now.toLocaleTimeString("vi-VN")}</span>;
}

export default Clock;
