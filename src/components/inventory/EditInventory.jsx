// src/components/inventory/EditInventory.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InventoryForm from "./InventoryForm";
import { readTicket, updateTicket } from "../../datasource/api-inventory";

const EditInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    ticketNumber: "",
    customerName: "",
    customerEmail: "",
    priority: "Low",
    description: "",
    status: "",
    error: "",
    loading: true,
  });

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const data = await readTicket(id);

        if (data.message && !data._id) {
          setValues((v) => ({ ...v, error: data.message, loading: false }));
        } else {
          setValues({
            ticketNumber: data.ticketNumber,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            priority: data.priority,
            description: data.description,
            status: data.status,
            error: "",
            loading: false,
          });
        }
      } catch {
        setValues((v) => ({ ...v, error: "Unable to load ticket.", loading: false }));
      }
    };

    loadTicket();
  }, [id]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateTicket(id, {
        priority: values.priority,
        description: values.description,
      });

      if (data.error || (data.message && !data.success)) {
        setValues({ ...values, error: data.error || data.message });
      } else {
        navigate("/tickets");
      }
    } catch {
      setValues({ ...values, error: "Unable to update ticket." });
    }
  };

  if (values.loading) return <p>Loading...</p>;

  return (
    <section>
      <h2>Edit Ticket</h2>
      <p><strong>Status:</strong> {values.status}</p>

      {values.error && <p className="error">{values.error}</p>}

      <InventoryForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        isEdit={true}
      />
    </section>
  );
};

export default EditInventory;
