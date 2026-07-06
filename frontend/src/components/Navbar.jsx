import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
//import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-white shadow">

      {/* Logo Row */}
      <div className="flex items-center gap-1 mb-2 mt-2 ml-1">
       <Link to="/"> 
       <img src={logo} alt="Logo" className="h-10 w-16"/> </Link>
       <Link to="/" className="text-blue-600 font-bold text-4xl hover:text-orange-500">
           Mezmur Tech
        </Link>
        <h2 className="text-1xl tracking-widest ml-auto mr-3 uppercase">
           Transforming challenges into innovative solutions
        </h2>
      </div>

      {/* Links Row */}
    <div className="w-full bg-orange-400">
    <div className="flex gap-6 px-6 py-3 text-white font-medium">
    
        <Link to="/" className="hover:text-blue-600"> Home </Link>
        <Link to="/abouts" className="hover:text-blue-600"> About Me </Link>
        <Link to="/projects" className="hover:text-blue-600"> Projects </Link>
        <Link to="/skills" className="hover:text-blue-600"> Skills </Link>
        <Link to="/services" className="hover:text-blue-600"> Services </Link>
        <Link to="/contact" className="hover:text-blue-600"> Contact </Link>
        <Link to="/blogs" className="hover:text-blue-600"> Blogs </Link>  
        <button className="ml-auto hover:text-blue-600 bg-blue-600 px-2 py-1 rounded-lg hover:bg-gray-100">
          <Link to ="admin/login">Login</Link></button>
    </div>
       
    </div>

    </nav>
  );
}

export default Navbar;