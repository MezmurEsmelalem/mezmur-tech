import { useState } from "react";
import api from "../api/axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await api.post("/api/messages", formData);

      setSuccess(res.data.message);

      setFormData({
        name: "",
        email: "",
        title: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pb-4 pt-4 justify-center dark:bg-gray-900">
       <div className="dark:bg-gray-800 p-1 w-full max-w-sm bg-gray-300 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-1 text-center dark:text-white">
        Contact Me
      </h1>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="eg. John"
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="eg. John@example.com"
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
             Message
          </label>

          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      </div>
    </div>
  );
}

export default Contact;