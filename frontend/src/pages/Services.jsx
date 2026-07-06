import { useEffect, useState } from "react";
import api from "../api/axios";
import * as FaIcons from "react-icons/fa";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await api.get("/api/services");

        const activeServices = res.data.filter(
          (service) => service.is_active
        );

        setServices(activeServices);
      } catch (err) {
        console.log(err);
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
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
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-1">

      {/* Header */}
      {/* <div className="text-center mb-12"> */}
        <h1 className="text-gray-200 text-3xl font-bold mb-6 mt-6 text-center">
          My Services
        </h1>
      {/* </div> */}

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center text-gray-500">
          No services available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => {
            const Icon = FaIcons[service.icon];

            return (
              <div
                key={service.id}
                className="group bg-amber-200 hover:bg-amber-300 hover:scale-105 transition-transform duration-300 border rounded-xl shadow-sm hover:shadow-lg p-5 mb-5"
              >

                {/* ICON FIXED */}
                {Icon && (
                  <div className="text-4xl mb-4">
                    <Icon className=" group-hover:text-blue-400"/>
                  </div>
                )}

                <h2 className="text-xl font-bold mb-3 group-hover:text-black">
                  {service.title}
                </h2>

                <p className="text-gray-600 mb-4 group-hover:text-black text-justify">
                  {service.description}
                </p>

                {service.price && (
                  <div className="font-semibold text-blue-600">
                    {service.price}
                  </div>
                )}

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default Services;