import React from "react";
import { useTimer } from "react-timer-hook";

const Timer = ({ expiryTimestamp }: { expiryTimestamp: Date }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="font-semibold">
      <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span>{" "}
      <span>{seconds}s</span>
    </div>
  );
};

export default Timer;
