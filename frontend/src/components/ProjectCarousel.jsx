import { useEffect, useState } from "react";

export default function ProjectCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {

    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="h-80 bg-gray-200 flex items-center justify-center">
        No Image
      </div>
    );
  }

  return (
<div
      className="relative w-full h-[540px] overflow-hidden rounded-lg">
      <img
        src={images[current]}
        alt="Project"
        className="w-full h-full object-contain transition-all duration-700"
      />

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-red-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}