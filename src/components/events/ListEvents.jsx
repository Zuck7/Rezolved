// src/components/events/ListEvents.jsx
import React, { useEffect, useState } from "react";
import { listEvents, deleteEvent } from "../../datasource/api-event.js";
import auth from "../auth/auth-helper.js";
import ListItemEvent from "./ListItemEvent.jsx";

const ListEvents = () => {
  const jwt = auth.isAuthenticated();
  const token = jwt && jwt.token;

  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      const data = await listEvents(token);

      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setError(data.error || data.message);
      }
    } catch {
      setError("Unable to load events.");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      const data = await deleteEvent(id, token);

      if (data.error || data.message) {
        setError(data.error || data.message);
      } else {
        loadEvents();
      }
    } catch {
      setError("Unable to delete event.");
    }
  };

  return (
    <section>
      <h2>Event Dashboard</h2>

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <ListItemEvent
                  key={event._id}
                  event={event}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ListEvents;
