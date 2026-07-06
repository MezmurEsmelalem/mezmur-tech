import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

function ScrollToBottom() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      // Hide when already at the bottom
      setVisible(scrollPosition < pageHeight - 50);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToBottom}
        title="Scroll to Bottom"
        className="fixed bottom-6 right-6 z-50 bg-gray-200  text-black p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
      >
        <FaArrowDown />
      </button>
    )
  );
}

export default ScrollToBottom;