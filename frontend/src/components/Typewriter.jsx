import { useState, useEffect } from "react";

export default function Typewriter({
  text,
  speed = 70,
  cursorSpeed = 500,
  restartDelay = 10000,
}) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let typingInterval;
    let restartTimeout;

    const startTyping = () => {
      let index = 0;
      setDisplayText("");

      typingInterval = setInterval(() => {
        index++;

        setDisplayText(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(typingInterval);

          restartTimeout = setTimeout(() => {
            startTyping();
          }, restartDelay);
        }
      }, speed);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(restartTimeout);
    };
  }, [text, speed, restartDelay]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorSpeed]);

  return (
    <span className="relative inline-block">
      {displayText}
      <span className="absolute right-[-6px]">
    {showCursor ? "|" : ""}
  </span>
    </span>
  );
}