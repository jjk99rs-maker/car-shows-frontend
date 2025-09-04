export default function EventList({ events }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <li
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <h3>{event.name}</h3>
            <p>
              {event.location} - {event.city}, {event.province}
            </p>
            <p>Date: {event.date}</p>
          </li>
        ))
      )}
    </ul>
  );
}
