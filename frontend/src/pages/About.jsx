import { useEffect, useState } from "react";
import api from "../api/axios";
import { MdWavingHand } from "react-icons/md";
import Typewriter from "../components/Typewriter";
import { FaLinkedin } from "react-icons/fa";
import ExpandableText from "../components/ExpandableText";

//const API_URL = import.meta.env.VITE_API_URL;

function About() {

  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await api.get("/api/abouts");

        // Use first record
        if (res.data.length > 0) {
          setAbout(res.data[0]);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load About information.");
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
  }, []);

  if (loading) {
    return (
      <div className="w-full mx-auto px-6 py-16 animate-pulse">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="h-10 w-72 bg-gray-300 rounded mx-auto mb-4"></div>
          <div className="h-5 w-72 bg-gray-200 rounded mx-auto"></div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Image */}
          <div className="flex justify-center">
            <div className="w-72 h-72 rounded-full bg-gray-300"></div>
          </div>

          {/* Details */}
          <div className="bg-gray-300">

            <div className="space-y-3 mb-8">
              <div className="h-4 bg-white/30 rounded w-full"></div>
              <div className="h-4 bg-white/30 rounded w-11/12"></div>
              <div className="h-4 bg-white/30 rounded w-10/12"></div>
              <div className="h-4 bg-white/30 rounded w-9/12"></div>
              <div className="h-4 bg-white/30 rounded w-8/12"></div>
            </div>

            <div className="bg-white/20 rounded-lg p-6 space-y-4">
              <div className="h-5 bg-white/30 rounded w-2/3"></div>
              <div className="h-5 bg-white/30 rounded w-1/2"></div>
              <div className="h-5 bg-white/30 rounded w-3/4"></div>

              <div className="pt-4">
                <div className="h-6 bg-white/30 rounded w-48 mb-3"></div>
                <div className="h-4 bg-white/20 rounded w-full mb-5"></div>

                <div className="flex gap-3">
                  <div className="h-10 w-28 bg-white/30 rounded-lg"></div>
                  <div className="h-10 w-32 bg-white/30 rounded-lg"></div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  if (!about) {
    return (
      <div className="text-center py-20">
        No About Information Found
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-0 px-6 py-16 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        // backgroundImage: "url('/about.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="flex items-center justify-center text-4xl font-bold mb-4 text-gray-200 animate-bounce">
          <MdWavingHand className="text-green-400" />
          {about.title}
        </h1>

        {about.subtitle && (
          <p className="text-xl text-gray-200">
            <Typewriter
              text={about.subtitle}
              speed={70}
              restartDelay={10000}
              cursorSpeed={400}
            />
          </p>
        )}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-0 items-start">

        {/* Image */}
        <div className="flex p-4 justify-center">
          <div>
            {about.image ? (
              <img
                src={about.image}
                alt={about.title}
                className="w-72 h-72 object-cover rounded-full border-4 border-orange-400 shadow-xl transition duration-300 hover:scale-105"
              />

            ) : (
              <div className="bg-gray-200 h-80 rounded-xl flex items-center justify-center">
                No Image
              </div>
            )}

            <blockquote className="mt-40 max-w-xs rounded-xl bg-slate-400 bg-opacity-50 text-lg p-14 transition-all hover:scale-105 duration-200 border-l-4 border-orange-400 text-center text-gray-200 shadow-lg">
              <div className="italic">
                "Building modern web experiences that are fast, functional, and user-focused."
              </div>
              <div className="flex gap-1 bg-gray-100 items-center justify-center mx-8 mt-8 px-2 py-2 rounded-lg w-32 font-semibold text-blue-500">

                <a href="https://www.linkedin.com/in/mezmur-esmelalem-231860416"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaLinkedin /></a>
                <a href="https://www.linkedin.com/in/mezmur-esmelalem-231860416"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  Connect</a>
              </div>
            </blockquote>


          </div>
        </div>

        {/* Details */}
        {/* <div> */}
        {/* 
          <h2 className="text-2xl font-bold mb-4">
            About Me
          </h2> */}
        <div className="mt-8 mr-2 bg-gradient-to-r from-purple-600 to-purple-600 text-white rounded-2xl shadow-xl p-6 transition duration-300 hover:scale-105">

          <div className="text-gray-200 mb-6">
            <ExpandableText
              text={about.description}
              buttonClassName="text-gray-300"
            />
          </div>
          {/* <div className="bg-white/20 p-4 rounded-lg"> */}
          {/* <div className="space-y-3 "> */}
          <div className="bg-white/20 p-6 rounded-lg">

            {about.email && (
              <p className="mb-3">
                <strong>Email:</strong> {about.email}
              </p>
            )}

            {about.phone && (
              <p className="mb-3">
                <strong>Phone:</strong> {about.phone}
              </p>
            )}

            {about.location && (
              <p className="mb-5">
                <strong>Location:</strong> {about.location}
              </p>
            )}

            {about.cv_file && (
              <>
                <h3 className="text-xl font-bold mb-2">
                  Resume / Curriculum Vitae
                </h3>

                <p className="mb-4 text-blue-100">
                  Interested in my experience and skills? View or download my CV.
                </p>

                <div className="flex gap-3">
                  <a
                    href={about.cv_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-300 text-blue-600 px-5 py-2 rounded-lg font-semibold"
                  >
                    View
                  </a>

                  <a
                     href={`${about.cv_file}?download=Mezmur_Esmelalem_CV.pdf`}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    Download
                  </a>
                </div>
              </>
            )}

          </div>
        </div>
        {/* </div> */}

      </div>

    </div>
  );
}

export default About;