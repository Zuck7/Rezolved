// src/components/events/AddEvent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "./EventForm.jsx";
import { createEvent } from "../../datasource/api-event.js";
import auth from "../auth/auth-helper.js";

const AddEvent = () => {
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();
  const token = jwt && jwt.token;
  const user = auth.getUser();

  const [values, setValues] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    status: "Upcoming",
    error: "",
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createEvent(
        {
          title: values.title,
          description: values.description,
          location: values.location,
          date: values.date,
          status: values.status,
          createdBy: user?.id,
        },
        token
      );

      if (data.error || data.message) {
        setValues({ ...values, error: data.error || data.message });
      } else {
        navigate("/events");
      }
    } catch {
      setValues({ ...values, error: "Unable to create event." });
    }
  };

  return (
    <section>
      <h2>Create New Event</h2>
      {values.error && <p className="error">{values.error}</p>}

      <EventForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Event"
        isEdit={false}
      />
    </section>
  );
};

export default AddEvent;
