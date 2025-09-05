import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminApproveEvents() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === adminPassword) setAuthorized(true);
    else setStatus("❌ Incorrect password");
  };

  useEffect(() => {
    if (authorized) fetchPendingEvents();
  }, [authorized]);

  async function fetchPendingEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (error) setStatus("Error: " + error.message);
    else setPendingEvents(data);

    setLoading(false);
  }

  async function approveEvent(id) {
    const { error } = await supabase
      .from("events")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) setStatus("Error: " + error.message);
    else {
      setStatus("✅ Event approved");
      fetchPendingEvents(); // refresh list
    }
  }

  if (!authorized) {
    return (
      <div className="p-6 max-w-md mx-auto border rounded">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-2 mb-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
            Login
          </button>
        </form>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </div>
    );
  }

  if (loading) return <p>Loading pending events...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Events</h2>
      {status && <p className="mb-2">{status}</p>}

      {pendingEvents.length === 0 ? (
        <p>No pending events!</p>
      ) : (
        <ul className="space-y-2">
          {pendingEvents.map((event) => (
            <li key={event.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
                {event.description && <p>{event.description}</p>}
              </div>
              <button
                onClick={() => approveEvent(event.id)}
                className="bg-green-600 text-white p-2 rounded"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
