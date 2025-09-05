import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SubmitEventForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("events").insert([{ ...formData, status: "pending" }]);


    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("✅ Event submitted successfully!");
      setFormData({ name: "", date: "", location: "", description: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit an Event</h2>

      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 mb-2 border rounded"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full p-2 mb-2 border rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full p-2 mb-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />

      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Submit Event
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}
      
    </form>
  );
}
