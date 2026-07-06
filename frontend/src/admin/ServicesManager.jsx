import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import * as FaIcons from "react-icons/fa";

function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    price: "",
    is_active: true,
  });

  // ICON MODAL STATES
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const modalRef = useRef(null);

  const iconKeys = Object.keys(FaIcons).filter((key) =>
    key.toLowerCase().includes(iconSearch.toLowerCase())
  );

  // ================= FETCH SERVICES =================
  const fetchServices = async () => {
    try {
      const res = await api.get("/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   const loadServices = async () => {
    try {
      const res = await api.get("/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  loadServices();
}, []);
  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      icon: "",
      price: "",
      is_active: true,
    });

    setEditingId(null);
  };

  // ================= CREATE =================
  const createService = async () => {
    await api.post("/api/services", form);
  };

  // ================= UPDATE =================
  const updateService = async () => {
    await api.put(`/api/services/${editingId}`, form);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateService();
      } else {
        await createService();
      }

      resetForm();
      fetchServices();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;

    try {
      await api.delete(`/api/services/${id}`);
      fetchServices();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (service) => {
    setEditingId(service.id);

    setForm({
      title: service.title || "",
      description: service.description || "",
      icon: service.icon || "",
      price: service.price || "",
      is_active: service.is_active,
    });
  };

  // ================= SELECT ICON =================
  const selectIcon = (iconName) => {
    setForm({ ...form, icon: iconName });
    setIconModalOpen(false);
    setIconSearch("");
  };

  // CLOSE MODAL OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIconModalOpen(false);
        setIconSearch("");
      }
    };

    if (iconModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [iconModalOpen]);

  if (loading) {
    return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  }

  const SelectedIcon = form.icon ? FaIcons[form.icon] : null;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Services Manager</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Service Title"
          className="border p-2 rounded"
        />

        {/* ICON PICKER BUTTON */}
        <button
          type="button"
          onClick={() => setIconModalOpen(true)}
          className="border p-2 rounded flex items-center gap-2"
        >
          {SelectedIcon ? <SelectedIcon /> : null}
          {form.icon || "Choose Icon"}
        </button>

        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (Negotiable, Contact Me, etc.)"
          className="border p-2 rounded md:col-span-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Service Description"
          rows="4"
          className="border p-2 rounded md:col-span-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          Active Service
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-2"
        >
          {editingId ? "Update" : "Create"} Service
        </button>
      </form>

      {/* SERVICES LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = FaIcons[service.icon];

          return (
            <div key={service.id} className="bg-white p-5 border rounded">

              {Icon && <Icon className="text-3xl mb-2" />}

              <h2 className="text-xl font-bold">{service.title}</h2>
              <p>{service.description}</p>
              <p className="text-blue-600 font-semibold">{service.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-yellow-500 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ICON PICKER MODAL */}
      {iconModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white p-4 rounded w-[600px] max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-lg font-bold mb-2">Select Icon</h2>

            <input
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
              placeholder="Search icon..."
              className="border p-2 w-full mb-3"
            />

            <div className="grid grid-cols-8 gap-2">
              {iconKeys.map((key) => {
                const IconComp = FaIcons[key];
                return (
                  <button
                    key={key}
                    onClick={() => selectIcon(key)}
                    className="p-2 border hover:bg-gray-100"
                  >
                    <IconComp />
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIconModalOpen(false)}
              className="mt-3 bg-gray-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ServicesManager;