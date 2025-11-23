// src/components/inventory/ListItemInventory.jsx
import React from "react";
import { Link } from "react-router-dom";

const ListItemInventory = ({ ticket, onCancel }) => {
  return (
    <tr>
      <td>{ticket.ticketNumber}</td>
      <td>{ticket.customerName}</td>
      <td>{ticket.customerEmail}</td>
      <td>{ticket.priority}</td>
      <td>{ticket.status}</td>
      <td>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : ""}</td>

      <td>
        <Link className="btn small" to={`/tickets/edit/${ticket._id}`}>
          Edit
        </Link>{" "}

        {ticket.status !== "CANCELLED" && ticket.status !== "CLOSED" && (
          <button className="btn small danger" onClick={() => onCancel(ticket._id)}>
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
};

export default ListItemInventory;
