import { useEffect, useState } from "react";
import api from "../api/axios";
import ProjectCarousel from "../components/ProjectCarousel";

function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/api/projects");
        setProjects(res.data);
      } catch (err) {
        setError("Failed to load projects");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
  return (
    <div className="max-w-7xl mx-auto p-6 animate-pulse">
      {/* Title */}
      <div className="h-10 w-64 bg-gray-300 rounded mx-auto mb-10"></div>

      {/* Project Cards */}
      <div className="space-y-8">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="border border-gray-300 rounded-md p-4 bg-gray-200 shadow"
          >
            {/* Project Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-5 w-28 bg-white/40 rounded"></div>
                <div className="h-6 w-48 bg-white/50 rounded"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-5 w-20 bg-white/40 rounded"></div>
                <div className="h-6 w-40 bg-white/50 rounded"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-5 w-24 bg-white/40 rounded"></div>
                <div className="h-6 w-32 bg-white/50 rounded"></div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/30 border border-gray-300 rounded p-4 mb-6 space-y-3">
              <div className="h-4 bg-white/50 rounded w-full"></div>
              <div className="h-4 bg-white/50 rounded w-11/12"></div>
              <div className="h-4 bg-white/50 rounded w-10/12"></div>
              <div className="h-4 bg-white/50 rounded w-9/12"></div>
            </div>

            {/* Image */}
            <div className="w-full h-[540px] rounded-lg bg-gray-300 mb-6"></div>

            {/* Buttons */}
            <div className="flex gap-6">
              <div className="h-10 w-36 rounded bg-white/40"></div>
              <div className="h-10 w-36 rounded bg-white/40"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl overflow-hidden mx-auto p-6">
      <h1 className="text-gray-200 text-3xl font-bold mb-6 text-center">
        My Projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-center text-gray-300">
          No projects found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-blue-400 border rounded-md shadow hover:bg-green-300 p-4 bg-green-200"
            >
             
        <div>
        
          
               <div className="flex items-center gap-2 mb-1 mt-2">
                <span className="text-gray-500 font-medium">Project Name:</span>
                <h2 className="text-xl text-blue-600 font-semibold">
                  {project.name}
                </h2>
              </div>

              <div className="flex items-center gap-2 mb-1 mt-2">
                <span className="text-gray-500 font-medium">Type:</span>
                <h2 className="text-xl text-blue-600 font-semibold">
                  {project.type}
                </h2>
              </div>

              <div className="flex items-center gap-2 mb-1 mt-2">
                <span className="text-gray-500 font-medium">Status:</span>
                <h2 className="text-xl text-blue-600 font-semibold">
                  {project.status}
                </h2>
              </div>

              <p className="text-black bg-white border border-blue-400 p-4 text-justify mb-3">
                {project.description}
              </p>
              
                {/* Image */}
              <ProjectCarousel images={project.images}/>
        </div>

              <div className="flex gap-3 text-sm">
                {project.github_link ? (
                  <a
                    href={project.github_link}
                    target="_blank"
                    className="bg-blue-500 text-gray-100 m-8 p-2 hover:underline"
                  >
                    GitHub Link
                  </a>
                  ):(
                   <span className="bg-blue-500 text-gray-100 m-8 p-2">GitHub Coming Soon...</span>
                )}

                {project.demo_link ? (
                  <a
                    href={project.demo_link}
                    target="_blank"
                    className="bg-blue-500 text-gray-100 m-8 p-2 hover:underline"
                  >
                    Live Demo
                  </a>
                ):(
                   <span className="bg-blue-500 text-gray-100 m-8 p-2">Demo Coming Soon...</span>
                
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Project;