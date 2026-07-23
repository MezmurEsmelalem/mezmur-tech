import { useState } from "react";

export default function ExpandableText({ text,  buttonClassName = "", }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p
        className={`text-left leading-relaxed ${
          expanded ? "" : "line-clamp-3 md:line-clamp-none"
        }`}
      >
        {text}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className={`md:hidden mt-2 font-medium hover:underline ${buttonClassName}`}
      >
        {expanded ? "Show Less" : "Show More"}
      </button>
    </>
  );
}