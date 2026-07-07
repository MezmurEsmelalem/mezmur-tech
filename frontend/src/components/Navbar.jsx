import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
//import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
<nav className="bg-white shadow">

  {/* Top */}
  <div className="flex items-center justify-between px-4 py-3">

    <div className="flex items-center gap-2">

      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-14"
        />
      </Link>

      <Link
        to="/"
        className="text-2xl md:text-4xl font-bold text-blue-600 hover:text-orange-500"
      >
        Mezmur Tech
      </Link>

    </div>

    {/* Desktop slogan */}

    <h2 className="hidden lg:block uppercase tracking-widest text-1xl">
      Transforming challenges into innovative solutions
    </h2>

    {/* Mobile Menu Button */}

    <button
      className="md:hidden"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? (
        <HiX size={30} />
      ) : (
        <HiMenu size={30} />
      )}
    </button>

  </div>

  {/* Desktop Menu */}

  <div className="hidden md:flex items-center gap-6 bg-orange-400 px-6 py-3 text-white font-medium">

    <Link to="/" className="hover:text-blue-600">Home</Link>

    <Link to="/abouts" className="hover:text-blue-600">About Me</Link>

    <Link to="/projects" className="hover:text-blue-600">Projects</Link>

    <Link to="/skills" className="hover:text-blue-600">Skills</Link>

    <Link to="/services" className="hover:text-blue-600">Services</Link>

    <Link to="/contact" className="hover:text-blue-600">Contact</Link>

    <Link to="/blogs" className="hover:text-blue-600">Blogs</Link>

    <Link
      to="/admin/login"
      className="ml-auto bg-blue-600 px-3 py-1 rounded hover:bg-white hover:text-blue-600"
    >
      Login
    </Link>

  </div>

  {/* Mobile Menu */}

  {menuOpen && (
    <div className="md:hidden bg-orange-400 text-white flex flex-col">

      <Link className="px-5 py-3 transition-colors duration-200 hover:bg-orange-500 active:bg-orange-700" to="/" onClick={() => setMenuOpen(false)}>
        Home
      </Link>

      <Link className="px-5 py-3 transition-colors duration-200 hover:bg-orange-500 active:bg-orange-700" to="/abouts" onClick={() => setMenuOpen(false)}>
        About Me
      </Link>

      <Link className="px-5 py-3 transition-colors duration-200 hover:bg-orange-500 active:bg-orange-700" to="/projects" onClick={() => setMenuOpen(false)}>
        Projects
      </Link>

      <Link className="px-5 py-3 transition-colors duration-200 hover:bg-orange-500 active:bg-orange-700" to="/skills" onClick={() => setMenuOpen(false)}>
        Skills
      </Link>

      <Link className="px-5 py-3 transition-colors duration-200 hover:bg-orange-500 active:bg-orange-700" to="/services" onClick={() => setMenuOpen(false)}>
        Services
      </Link>

      <Link className="px-5 py-3 transition-colors duration-200 hover:bg-orange-500 active:bg-orange-700" to="/contact" onClick={() => setMenuOpen(false)}>
        Contact
      </Link>

      <Link className="px-5 py-3 transition-colors duration-200 hover:bg-orange-500 active:bg-orange-700" to="/blogs" onClick={() => setMenuOpen(false)}>
        Blogs
      </Link>

      <Link
        className="mx-40 my-4 text-center bg-blue-600 hover:bg-white hover:text-blue-600 font-medium rounded py-2"
        to="/admin/login"
        onClick={() => setMenuOpen(false)}
      >
        Login
      </Link>

    </div>
  )}

</nav>
);
}

export default Navbar;