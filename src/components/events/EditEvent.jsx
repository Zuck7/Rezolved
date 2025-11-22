// src/components/events/EditEvent.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "./EventForm.jsx";
import { readEvent, updateEvent } from "../../datasource/api-event.js";
import auth from "../auth/auth-helper.js";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const jwt = auth.isAuthenticated();
  const token = jwt && jwt.token;

  const [values, setValues] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    status: "Upcoming",
    createdByUsername: "",
    error: "",
    loading: true,
  });

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await readEvent(id, token);

        if (data.message === "Event not found") {
          setValues({ ...values, error: data.message, loading: false });
        } else {
          setValues({
            title: data.title,
            description: data.description,
            location: data.location,
            date: data.date
              ? new Date(data.date).toISOString().slice(0, 16)
              : "",
            status: data.status,
            createdByUsername: data.createdBy?.username || "",
            error: "",
            loading: false,
          });
        }
      } catch {
        setValues({ ...values, error: "Unable to load event.", loading: false });
      }
    };

    loadEvent();
  }, [id]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateEvent(
        id,
        {
          title: values.title,
          description: values.description,
          location: values.location,
          date: values.date,
          status: values.status,
        },
        token
      );

      if (data.error || data.message) {
        setValues({ ...values, error: data.error || data.message });
      } else {
        navigate("/events");
      }
    } catch {
      setValues({ ...values, error: "Unable to update event." });
    }
  };

  if (values.loading) return <p>Loading...</p>;

  return (
    <section>
      <h2>Edit Event</h2>
      {values.error && <p className="error">{values.error}</p>}

      <EventForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        isEdit={true}
      />
    </section>
  );
};

export default EditEvent;
