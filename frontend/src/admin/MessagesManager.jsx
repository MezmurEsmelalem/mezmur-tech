import { useEffect, useState } from "react";
import api from "../api/axios";

function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // ================= FETCH MESSAGES =================
  const fetchMessages = async () => {
    try {
      const res = await api.get("/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.log("Error loading messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadMessages = async () => {
    try {
      const res = await api.get("/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  loadMessages();
}, []);

  // ================= DELETE MESSAGE =================
  const deleteMessage = async (id) => {
    if (!confirm("Delete this message?")) return;

    try {
      await api.delete(`/api/messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/messages/${id}`, { status });
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Messages Manager
      </h1>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className="border rounded-lg p-4 shadow bg-white"
          >
            <h2 className="font-bold text-lg">
              {msg.title}
            </h2>

            <p className="text-sm text-gray-600">
              From: {msg.name} ({msg.email})
            </p>

            <p className="mt-2 text-gray-700">
              {msg.message}
            </p>

            <p className="mt-2 text-sm">
              Status:{" "}
              <span className="font-bold text-blue-600">
                {msg.status}
              </span>
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">

              <button
                onClick={() => setSelectedMessage(msg)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                View
              </button>

              <button
                onClick={() => updateStatus(msg.id, "Read")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Mark Read
              </button>

              <button
                onClick={() => updateStatus(msg.id, "Replied")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Replied
              </button>

              <button
                onClick={() => deleteMessage(msg.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL / DETAIL VIEW */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[400px]">

            <h2 className="text-xl font-bold mb-2">
              {selectedMessage.title}
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              {selectedMessage.name} ({selectedMessage.email})
            </p>

            <p className="mb-4">
              {selectedMessage.message}
            </p>

            <button
              onClick={() => setSelectedMessage(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default MessagesManager;