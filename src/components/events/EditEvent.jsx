import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventModel from "../../datasource/eventModel";
import { update, read } from "../../datasource/api-event";
import EventForm from "./EventForm";

const EditEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState(new EventModel());
    const [errorMsg, setErrorMsg] = useState('')

    // When the component loads.
    useEffect(() => {
        read(id).then(data => {
            console.log('Read response:', data);
            if (data && data.success !== false && !data.message) {
                setEvent({
                    id: data._id || data.id,
                    name: data.title || data.name,
                    date: data.eventDate ? new Date(data.eventDate).toISOString().slice(0, 16) : '',
                    location: data.location,
                    description: data.description,
                    organizer: data.organizer,
                    organizerEmail: data.organizerEmail,
                    priority: data.priority || 'Low'
                });
            } else {
                setErrorMsg(data?.message || 'Failed to load event');
            }

        }).catch(err => {
            setErrorMsg(err?.message || 'An error occurred');
            console.error('Read error:', err);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(formData => ({ ...formData, [name]: value }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updating event: ", event);

        // Transform frontend fields to match backend schema
        const submitEvent = {
            title: event.name,
            eventDate: event.date,
            location: event.location,
            description: event.description,
            priority: event.priority || 'Low'
        };

        update(submitEvent, id)
            .then(data => {
                if (data && data.success) {
                    alert(data.message || 'Event updated successfully');
                    navigate("/events/list");
                } else {
                    setErrorMsg(data?.message || 'Failed to update event');
                }
            })
            .catch(err => {
                setErrorMsg(err?.message || 'An error occurred');
                console.error('Update error:', err);
            });
    }


    return (
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Edit Event</h1>
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

export default EditEvent;