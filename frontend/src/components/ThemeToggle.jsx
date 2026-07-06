// import { useEffect, useState } from "react";
// import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

// function ThemeToggle() {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "system"
//   );

//   useEffect(() => {
//     const root = document.documentElement;

//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else if (theme === "light") {
//       root.classList.remove("dark");
//     } else {
//       const prefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;

//       root.classList.toggle("dark", prefersDark);
//     }

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <div className="flex gap-2">
//       <button onClick={() => setTheme("light")}>
//         <FaSun />
//       </button>

//       <button onClick={() => setTheme("dark")}>
//         <FaMoon />
//       </button>

//       <button onClick={() => setTheme("system")}>
//         <FaDesktop />
//       </button>
//     </div>
//   );
// }

// export default ThemeToggle;