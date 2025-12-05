import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventModel from "../../datasource/eventModel";
import { create } from "../../datasource/api-event";
import ProjectsForm from "./EventForm";

const AddEvent = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState(new EventModel());
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProject(formData => ({ ...formData, [name]: value }));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting event: ", event);

        const submitEvent = {
            id: event.id,
            name: event.name,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description
        };

        create(submitEvent)
            .then(data => {
                if (data && data.id) {
                    alert(`Event added with the id ${data.id}`);
                    navigate("/events/list");
                } else {
                    setErrorMsg(data.message);
                }
            })
            .catch(err => {
                setErrorMsg(err.message);
                console.log(err);
            });
    }


    return (
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add Event</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <ProjectsForm
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