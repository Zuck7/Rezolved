import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventModel from "../../datasource/eventModel";
import { create } from "../../datasource/api-event";
import EventForm from "./EventForm";
import { getUsername } from "../auth/auth-helper";

const AddEvent = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState(new EventModel());
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(formData => ({ ...formData, [name]: value }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting event: ", event);

        // Transform frontend fields to match backend schema
        const submitEvent = {
            title: event.name,
            eventDate: event.date,
            location: event.location,
            description: event.description,
            organizer: getUsername() || 'Unknown',
            organizerEmail: event.organizerEmail,
            priority: event.priority || 'Low'
        };

        console.log("Sending event:", submitEvent);

        create(submitEvent)
            .then(data => {
                console.log('Create response:', data);
                if (data && (data._id || data.id)) {
                    alert(`Event created successfully!`);
                    navigate("/events/list");
                } else {
                    setErrorMsg(data?.message || 'Failed to create event');
                }
            })
            .catch(err => {
                setErrorMsg(err?.message || 'An error occurred');
                console.error('Create error:', err);
            });
    }


    return (
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add Event</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <EventForm
                        event={event}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddEvent;