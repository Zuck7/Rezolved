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
            if (data) {
                setProject(new EventModel(
                    data.id,
                    data.name,
                    data.date,
                    data.time,
                    data.location,
                    data.description
                ));
            } else {
                setErrorMsg(data.message);
            }

        }).catch(err => {
            setErrorMsg(err.message);
            console.log(err);
        });
    }, [id, navigate]);

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

        update(submitEvent, id)
            .then(data => {
                if (data && data.success) {
                    alert(data.message);
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
                    <h1>Edit Event</h1>
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

export default EditProject;