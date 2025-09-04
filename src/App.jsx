import { useState } from "react";
import { sampleEvents } from "./data/sampleEvents.js";
import EventList from "./components/EventList.jsx";
import EventMap from "./components/EventMap.jsx";

export default function App() {
  const [search, setSearch] = useState("");

  const filteredEvents = sampleEvents.filter(
    event =>
      event.city.toLowerCase().includes(search.toLowerCase()) ||
      event.province.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Canada Car Shows & Meets</h1>
        <input
          type="text"
          placeholder="Search by city or province..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginTop: "1rem"
          }}
        />
      </header>

      <main>
        <h2>Upcoming Events</h2>
        <EventList events={filteredEvents} />

        <section style={{ marginTop: "2rem" }}>
          <h2>Event Map</h2>
          <EventMap events={filteredEvents} />
        </section>
      </main>
    </div>
  );
}


