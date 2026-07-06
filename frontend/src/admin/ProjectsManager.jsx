import { useEffect, useState } from "react";
import api from "../api/axios";
import ProjectCarousel from "../components/ProjectCarousel";

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "",
    description: "",
    images: [],
    github_link: "",
    demo_link: "",
  });

  // ================= FETCH PROJECTS =================
  const fetchProjects = async () => {
    try {
      const res = await api.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  const loadProjects = async () => {
    try {
      const res = await api.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  loadProjects();
}, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  // ================= IMAGE UPLOAD =================

  const handleImageChange = (e) => {
  setForm({
    ...form,
    images: Array.from(e.target.files),
  });
};

  // ================= RESET FORM =================
  const resetForm = () => {
    setForm({
      name: "",
      type: "",
      status: "",
      description: "",
      images: [],
      github_link: "",
      demo_link: "",
    });
    setEditingId(null);
  };

  // ================= CREATE PROJECT =================
  const createProject = async () => {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("type", form.type);
  formData.append("status", form.status);
  formData.append("description", form.description);
  formData.append("github_link", form.github_link);
  formData.append("demo_link", form.demo_link);

  form.images.forEach((image) => {
  formData.append("images[]", image);
});

  await api.post("/api/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

  // ================= UPDATE PROJECT =================
  const updateProject = async () => {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("type", form.type);
  formData.append("status", form.status);
  formData.append("description", form.description);
  formData.append("github_link", form.github_link);
  formData.append("demo_link", form.demo_link);

  form.images.forEach((image) => {
  formData.append("images[]", image);
});

  formData.append("_method", "PUT");

  await api.post(`/api/projects/${editingId}`, formData, {
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
        await updateProject();
      } else {
        await createProject();
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  //================= EDIT =================
  const handleEdit = (project) => {
    setEditingId(project.id);

    setForm({
      name: project.name,
      type: project.type,
      status: project.status,
      description: project.description,
      images: [],
      github_link: project.github_link || "",
      demo_link: project.demo_link || "",
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

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        Projects Manager
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg mb-8"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="p-2 border rounded"
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type"
          className="p-2 border rounded"
        />

        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          placeholder="Status"
          className="p-2 border rounded"
        />

        {/* IMAGE UPLOAD */}
        <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="p-2 border rounded"
        />

        <input
          name="github_link"
          value={form.github_link}
          onChange={handleChange}
          placeholder="GitHub Link"
          className="p-2 border rounded"
        />

        <input
          name="demo_link"
          value={form.demo_link}
          onChange={handleChange}
          placeholder="Demo Link"
          className="p-2 border rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border h-40 rounded md:col-span-2"
        />

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              editingId ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {editingId ? "Update Project" : "Add Project"}
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

      {/* PROJECT LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">

        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg shadow p-4 bg-white"
          >

            {/* Image */}
            <ProjectCarousel images={project.images} />

            <h2 className="text-xl font-bold">
              {project.name}
            </h2>

            <p className="text-sm text-gray-500">
              {project.type} | {project.status}
            </p>

            <p className="mt-2 text-gray-700">
              {project.description}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(project.id)}
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

export default ProjectsManager;