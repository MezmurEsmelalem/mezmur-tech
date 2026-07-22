import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu, HiX} from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
//import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);
  const navigate = useNavigate();

  const {user, loading, logout} = useAuth();

  const handleLogout = async () => {

    await logout();

    navigate("/admin/login");

};

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
  onClick={() => setMenuOpen(true)}
>
  <HiMenu size={30} />
</button>

  </div>

  {/* Desktop Menu */}

  <div className="hidden md:flex items-center gap-6 bg-orange-400 px-6 py-3 text-white font-medium">

    <Link to="/" className="hover:text-blue-600"><FaHome /></Link>

    <Link to="/abouts" className="hover:text-blue-600">About Me</Link>

    <Link to="/projects" className="hover:text-blue-600">Projects</Link>

    <Link to="/skills" className="hover:text-blue-600">Skills</Link>

    <Link to="/services" className="hover:text-blue-600">Services</Link>

    <Link to="/contact" className="hover:text-blue-600">Contact</Link>

    <Link to="/blogs" className="hover:text-blue-600">Blogs</Link>

    {!loading && (
      user ? (
        <div className="ml-auto flex items-center gap-4">
          
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 hover:opacity-80 transition">             
            

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <span className="font-semibold text-white">
            {user.name}
          </span>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      ) : (
        <Link
          to="/admin/login"
          className="ml-auto bg-blue-600 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600"
        >
          Login
        </Link>
      )
    )}

  </div>

  {/* Mobile Menu */}

  {menuOpen && (
   <div className="fixed inset-0 z-[999] md:hidden">

    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setMenuOpen(false)}
    />

    {/* Menu */}
    <div className="relative h-full w-1/2 max-w-sm bg-orange-400 text-white flex flex-col overflow-y-auto shadow-2xl">

      <div className="flex justify-end p-4">
        <button onClick={() => setMenuOpen(false)}>
          <HiX size={32} />
        </button>
      </div>


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

      {!loading && (
      user ? (
        <div className="flex flex-col gap-4 px-5 py-4">

      <Link
        to="/admin/dashboard"
        onClick={() => setMenuOpen(false)}
        className="flex items-center gap-3 hover:bg-orange-500 active:bg-orange-700 px-3 py-2 rounded-lg transition"
      >

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <span className="font-semibold text-white">
          {user.name}
        </span>

      </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 mr-64 my-2 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      ) : (
        <Link
          to="/admin/login"
          className="mx-40 my-4 text-center bg-blue-600 hover:bg-white hover:text-blue-600 font-medium rounded py-2"
        >
          Login
        </Link>
      )
    )}

    </div>
    </div>
  )}

</nav>
);
}

export default Navbar;