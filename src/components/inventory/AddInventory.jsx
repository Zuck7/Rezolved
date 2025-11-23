// src/components/inventory/AddInventory.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InventoryForm from "./InventoryForm";
import { createTicket } from "../../datasource/api-inventory";

const AddInventory = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    customerName: "",
    customerEmail: "",
    priority: "Low",
    description: "",
    error: "",
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createTicket({
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        priority: values.priority,
        description: values.description,
      });

      if (data.error || data.message === "Ticket not created") {
        setValues({ ...values, error: data.error || data.message });
      } else {
        navigate("/tickets");
      }
    } catch {
      setValues({ ...values, error: "Unable to create ticket. Please try again." });
    }
  };

  return (
    <section>
      <h2>Create New Ticket</h2>
      {values.error && <p className="error">{values.error}</p>}

      <InventoryForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Ticket"
        isEdit={false}
      />
    </section>
  );
};

export default AddInventory;
