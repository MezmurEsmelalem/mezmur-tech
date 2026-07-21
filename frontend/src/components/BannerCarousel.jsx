// import { useState, useEffect } from "react";

// const images = ["/banner1.png", "/banner2.png", "/banner3.png", "/banner4.png"];

// export default function BannerCarousel({ position = "top" }) {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent(prev => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const goPrev = () => setCurrent(prev => (prev - 1 + images.length) % images.length);
//   const goNext = () => setCurrent(prev => (prev + 1) % images.length);

//   const objectPositionClass = {
//     top: "object-top",
//     center: "object-center",
//     bottom: "object-bottom"
//   }[position] || "object-center";

//   return (
//     <div className="relative w-full h-64 md:h-65 overflow-hidden">
//       {images.map((img, i) => (
//         <img
//           key={i}
//           src={img}
//           alt={`Banner ${i + 1}`}
//           className={`absolute top-0 left-0 w-full h-full object-cover ${objectPositionClass} transition-transform duration-300 transform ${
//             i === current ? "translate-x-0" : "translate-x-full"
//           }`}
//         />
//       ))}

//       {/* Overlay text */}
//       <div className="absolute inset-0 flex items-center justify-center text-white">
//         <h1 className="text-3xl md:text-5xl font-bold text-center">Welcome to Mezmur Tech</h1>
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={goPrev}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl font-bold bg-black bg-opacity-30 px-2 py-1 rounded hover:bg-opacity-50"
//       >
//         ‹
//       </button>
//       <button
//         onClick={goNext}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl font-bold bg-black bg-opacity-30 px-2 py-1 rounded hover:bg-opacity-50"
//       >
//         ›
//       </button>

//       {/* Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, i) => (
//           <span
//             key={i}
//             onClick={() => setCurrent(i)}
//             className={`w-3 h-3 rounded-full cursor-pointer ${
//               i === current ? "bg-white" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
