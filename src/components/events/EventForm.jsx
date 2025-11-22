// src/components/events/EventForm.jsx
import React from "react";

const EventForm = ({ values, onChange, onSubmit, submitLabel, isEdit }) => {
  return (
    <form className="inventory-form" onSubmit={onSubmit}>
      <label>
        Title
        <input
          type="text"
          value={values.title}
          onChange={onChange("title")}
          required
        />
      </label>

      <label>
        Description
        <textarea
          rows={4}
          value={values.description}
          onChange={onChange("description")}
          required
        />
      </label>

      <label>
        Location
        <input
          type="text"
          value={values.location}
          onChange={onChange("location")}
          required
        />
      </label>

      <label>
        Date & Time
        <input
          type="datetime-local"
          value={values.date}
          onChange={onChange("date")}
          required
        />
      </label>

      <label>
        Status
        <select value={values.status} onChange={onChange("status")} required>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </label>

      {isEdit && values.createdByUsername && (
        <p>
          <strong>Created by:</strong> {values.createdByUsername}
        </p>
      )}

      <button type="submit" className="btn primary">
        {submitLabel}
      </button>
    </form>
  );
};

export default EventForm;
