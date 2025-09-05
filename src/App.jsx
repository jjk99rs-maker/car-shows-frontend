import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import SubmitEventForm from "./components/SubmitEventForm";
import EventMap from "./components/EventMap";
import { Link } from "react-router-dom"; // for admin page link

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchApprovedEvents();
  }, []);

  // Fetch only approved events
  async function fetchApprovedEvents() {
    let { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "approved")
      .order("date", { ascending: true });

    if (error) console.error("Error fetching events:", error);
    else setEvents(data);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Header */}
      <header className="w-full max-w-6xl mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">🇨🇦 Canada Car Shows</h1>
        <p className="text-center text-gray-700 mb-4">
          Discover car shows and meets across Canada
        </p>
        <div className="text-center">
          <Link
            to="/admin"
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Admin Login
          </Link>
        </div>
      </header>

      {/* Submit Event Form */}
      <div className="w-full max-w-3xl mb-6">
        <SubmitEventForm onSubmit={fetchApprovedEvents} />
      </div>

      {/* Map + Event List */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map */}
        <div className="col-span-2 h-[500px]">
          <EventMap events={events} />
        </div>

        {/* Event List */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <ul className="space-y-2">
            {events.length === 0 ? (
              <p>No approved events yet!</p>
            ) : (
              events.map((event) => (
                <li
                  key={event.id}
                  className="border-b pb-2 last:border-none last:pb-0"
                >
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  {event.description && <p>{event.description}</p>}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;



