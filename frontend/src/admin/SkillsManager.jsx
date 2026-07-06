import { useEffect, useState } from "react";
import api from "../api/axios";

function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
  });

  // ================= FETCH SKILLS =================
  const fetchSkills = async () => {
    try {
      const res = await api.get("/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadSkills = async () => {
    try {
      const res = await api.get("/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  loadSkills();
}, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      name: "",
      type: "",
      description: "",
    });
    setEditingId(null);
  };

  // ================= CREATE =================
  const createSkill = async () => {
    await api.post("/api/skills", form);
  };

  // ================= UPDATE =================
  const updateSkill = async () => {
    await api.put(`/api/skills/${editingId}`, form);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateSkill();
      } else {
        await createSkill();
      }

      resetForm();
      fetchSkills();
    } catch (err) {
      console.log("SUBMIT ERROR:", err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;

    try {
      await api.delete(`/api/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setForm({
      name: skill.name,
      type: skill.type,
      description: skill.description || "",
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
        Skills Manager
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Skill Name"
          className="p-2 border rounded"
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type (Frontend, Backend...)"
          className="p-2 border rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded md:col-span-2"
        />

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              editingId ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {editingId ? "Update Skill" : "Add Skill"}
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

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white border rounded-lg shadow p-4"
          >
            <h2 className="text-xl font-bold">
              {skill.name}
            </h2>

            <p className="text-sm text-gray-500">
              {skill.type}
            </p>

            <p className="mt-2 text-gray-700">
              {skill.description}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => handleEdit(skill)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(skill.id)}
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

export default SkillsManager;