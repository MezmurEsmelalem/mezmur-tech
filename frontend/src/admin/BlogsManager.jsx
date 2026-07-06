import { useEffect, useState } from "react";
import api from "../api/axios";

const API_URL = import.meta.env.VITE_API_URL;

function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: null,
    status: "Draft",
  });

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    try {
      const res = await api.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log("Error loading blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadBlogs = async () => {
    try {
      const res = await api.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  loadBlogs();
}, []);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= IMAGE UPLOAD =================

  const handleImageChange = (e) => {

    setForm({
      ...form,
      image: e.target.files[0],
    });

  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      title: "",
      excerpt: "",
      content: "",
      image: null,
      status: "Draft",
    });
    setEditingId(null);
  };

  // ================= CREATE BLOG =================
  const createBlog = async () => {
    const formData = new FormData();
  
    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("status", form.status);
  
    if (form.image) {
      formData.append("image", form.image);
    }
  
    await api.post("/api/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // ================= UPDATE =================
  // ================= CREATE BLOG =================
  const updateBlog = async () => {
    const formData = new FormData();
  
    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("status", form.status);
  
    if (form.image) {
      formData.append("image", form.image);
    }
    
    formData.append("_method", "PUT");

    await api.post(`/api/blogs/${editingId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateBlog();
      } else {
        await createBlog();
      }

      resetForm();
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;

    try {
      await api.delete(`/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (blog) => {
    setEditingId(blog.id);

    setForm({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content,
      image: null,
      status: blog.status || "Draft",
    });
  };

  if (loading) {
    return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Blogs Manager
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg mb-8"
      >

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded"
        />

        <input
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          placeholder="Excerpt"
          className="p-2 border rounded"
        />

        {/* IMAGE UPLOAD */}
        <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="p-2 border rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          className="p-2 border rounded md:col-span-2"
        />

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              editingId ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {editingId ? "Update Blog" : "Add Blog"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* BLOG LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg shadow p-4 bg-white"
          >

          {blog.image && (

        <img

        src={`${API_URL}/storage/${blog.image}`}

        className="w-40 h-40 object-cover rounded mb-4"

        />

        )}

            <h2 className="text-xl font-bold">
              {blog.title}
            </h2>

            <p className="text-sm text-gray-500">
              Status: {blog.status}
            </p>

            <p className="mt-2 text-gray-700">
              {blog.excerpt}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => handleEdit(blog)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default BlogsManager;