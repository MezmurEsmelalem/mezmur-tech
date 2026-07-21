import { Link } from "react-router-dom";
//import BannerCarousel from "../components/BannerCarousel";
import About from "../pages/About";
import Skills from "../pages/Skills";
import Projects from "../pages/Projects";
//import Blogs from "../pages/Blogs";
import Services from "../pages/Services"

function Home() {
  return (
    <div className="min-h-screen">
      
     

      {/* Hero */}
      {/* <section id="home" >
         <BannerCarousel position="top" />
      </section> */}

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="services">
        <Services />
      </section>

      {/* <section id="blogs">
        <Blogs />
      </section> */}

        <Link
          to="/contact"
          className="relative z-10 flex items-center justify-center"
        >
        <button
            
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 hover:scale-105 duration-200 text-blue-700 font-semibold rounded my-24"
          >
            Make Contact
          </button>
          </Link>
        {/* <Link
          to="/contact"
          className="relative z-10 flex items-center justify-center"
        >
          <button 
          className="p-2 m-1">
          <h2 className="text-4xl font-bold text-black">
            Make Contact
          </h2>
          </button>
        </Link> */}
      {/* </section> */}
       
      {/* </Link> */}
        {/* <section
        className="h-[400px] bg- bg-center relative"
        style={{
          backgroundImage: "url('/tree.jpg')",
        }}
      ></section> */}

    </div>

    
  );
}

export default Home;