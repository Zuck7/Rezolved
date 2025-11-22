// src/components/inventory/InventoryForm.jsx
import React from "react";

const InventoryForm = ({
  values,
  onChange,
  onSubmit,
  submitLabel,
  isEdit = false,
}) => {
  return (
    <form className="inventory-form" onSubmit={onSubmit}>

      {/* READ-ONLY FIELDS WHEN EDITING */}
      {isEdit && (
        <>
          <label>
            Ticket Number
            <input type="text" value={values.ticketNumber || ""} disabled />
          </label>

          <label>
            Customer Name
            <input type="text" value={values.customerName || ""} disabled />
          </label>

          <label>
            Customer Email
            <input type="email" value={values.customerEmail || ""} disabled />
          </label>
        </>
      )}

      {/* EDITABLE FIELDS WHEN CREATING */}
      {!isEdit && (
        <>
          <label>
            Customer Name
            <input
              type="text"
              value={values.customerName}
              onChange={onChange("customerName")}
              required
            />
          </label>

          <label>
            Customer Email
            <input
              type="email"
              value={values.customerEmail}
              onChange={onChange("customerEmail")}
              required
            />
          </label>
        </>
      )}

      <label>
        Priority
        <select value={values.priority} onChange={onChange("priority")} required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
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

      <button type="submit" className="btn primary">
        {submitLabel}
      </button>
    </form>
  );
};

export default InventoryForm;
