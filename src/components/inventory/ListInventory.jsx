// src/components/inventory/ListInventory.jsx
import React, { useEffect, useState } from "react";
import { listTickets, cancelTicket } from "../../datasource/api-inventory";
import ListItemInventory from "./ListItemInventory";
import { getUsername } from "../auth/auth-helper";

const ListInventory = () => {
  const [tickets, setTickets] = useState([]);
  const [showClosed, setShowClosed] = useState(false);
  const [error, setError] = useState("");

  const loadTickets = async (includeClosed) => {
    try {
      const data = await listTickets(includeClosed);

      if (Array.isArray(data)) {
        setTickets(data);
        setError("");
      } else {
        setError(data.error || data.message || "Unable to load tickets.");
      }
    } catch {
      setError("Unable to load tickets.");
    }
  };

  useEffect(() => {
    loadTickets(showClosed);
  }, [showClosed]);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this ticket?")) return;

    try {
      const username = getUsername && getUsername();
      const data = await cancelTicket(id, username || "unknown");

      if (data.error || (data.success === false && data.message)) {
        setError(data.error || data.message);
      } else {
        loadTickets(showClosed);
      }
    } catch {
      setError("Unable to cancel ticket.");
    }
  };

  return (
    <section>
      <h2>Ticket Dashboard</h2>

      <div className="toolbar">
        <label>
          <input
            type="checkbox"
            checked={showClosed}
            onChange={(e) => setShowClosed(e.target.checked)}
          />
          Show closed tickets
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticket #</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <ListItemInventory
                  key={ticket._id}
                  ticket={ticket}
                  onCancel={handleCancel}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ListInventory;
