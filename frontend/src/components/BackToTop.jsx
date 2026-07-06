import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="w-full h-12 bg-gradient-to-r from-blue-800 to-blue-900 text-white font-bold shadow-2xl hover:scale-105 hover:shadow-xl transition transform flex items-center justify-center gap-2">
        Back to Top
      </button>
    </div>
  );
}
