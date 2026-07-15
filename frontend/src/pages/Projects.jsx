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
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
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
    <div className="max-w-max overflow-hidden mx-auto p-6">
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
              className="border-blue-400 border rounded-md shadow hover:bg-green-300 hover:-translate-y-2 transition mx-4 p-4 bg-green-200"
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
              <ProjectCarousel images={project.images} className="w-full h-full border-blue-400 object-cover shadow-lg"/>
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
                    className="text-green-500 hover:underline"
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