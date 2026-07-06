import { useEffect, useState } from "react";
import api from "../api/axios";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-gray-200 text-3xl font-bold mb-6 text-center">
        Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className=" text-2xl mb-6 text-center font-semibold text-orange-200">Coming Soon...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {/* Image */}
        <div>
        
          {blog.image ? (
            <img
              src={`http://127.0.0.1:8000/storage/${blog.image}`}
              alt={blog.name}
              className="w-full rounded-xl shadow-lg"
            />
          ) : (
            <div className="bg-gray-200 h-80 rounded-xl flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm mb-2">
                  Status: {blog.status}
                </p>

                {blog.excerpt && (
                  <p className="text-gray-700 mb-3">
                    {blog.excerpt}
                  </p>
                )}

                <p className="text-gray-500 text-sm">
                  Slug: {blog.slug}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;