// src/components/events/ListItemEvent.jsx
import React from "react";
import { Link } from "react-router-dom";

const ListItemEvent = ({ event, onDelete }) => {
  return (
    <tr>
      <td>{event.title}</td>
      <td>{event.location}</td>
      <td>{new Date(event.date).toLocaleString()}</td>
      <td>{event.status}</td>
      <td>
        <Link className="btn small" to={`/events/edit/${event._id}`}>
          Edit
        </Link>{" "}
        <button
          className="btn small danger"
          onClick={() => onDelete(event._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListItemEvent;
