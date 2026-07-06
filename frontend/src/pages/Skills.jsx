import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaCheckCircle } from "react-icons/fa";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/api/skills");
        setSkills(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-1">
      <h1 className="text-gray-200 text-3xl mb-6 mt-6 font-bold text-center">
        My Skills
      </h1>

      {skills.length === 0 ? (
        <p className="text-center text-gray-500">
          No skills found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="group bg-red-200 hover:bg-red-300 hover:-translate-y-4 hover:shadow-2xl transition-transform duration-300 shadow-md rounded-xl p-5 border mb-5"
            >
              <h2 className="text-xl font-semibold mb-2">
                {skill.name}
              </h2>

              <p className="text-sm text-blue-600 mb-2">
                {skill.type}
              </p>

              <div className="text-gray-600 group-hover:text-black">
                {skill.description.split("\n").map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;