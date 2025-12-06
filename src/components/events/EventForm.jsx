import React from "react";
import { useNavigate } from 'react-router-dom';

const EventForm = ({ event = {}, handleChange, handleSubmit }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="form card p-3">
            <input type="hidden" name="id" value={event.id || ""} />

            <div className="form-group">
                <label htmlFor="eventTextField">Event Name</label>
                <input
                    id="eventTextField"
                    name="name"
                    className="form-control"
                    placeholder="Enter the Event Name"
                    value={event.name || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="dateTextField">Event Date & Time</label>
                <input
                    id="dateTextField"
                    name="date"
                    type="datetime-local"
                    className="form-control"
                    placeholder="Enter the Event Date and Time"
                    value={event.date || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="locationTextField">Location</label>
                <input
                    id="locationTextField"
                    name="location"
                    className="form-control"
                    placeholder="Enter the Location"
                    value={event.location || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="prioritySelect">Priority</label>
                <select
                    id="prioritySelect"
                    name="priority"
                    className="form-control"
                    value={event.priority || "Low"}
                    onChange={handleChange}
                    required
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="descriptionTextField">Description</label>
                <textarea
                    id="descriptionTextField"
                    name="description"
                    className="form-control"
                    placeholder="Enter the Event Description"
                    value={event.description || ""}
                    onChange={handleChange}
                    rows="4"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="organizerEmailTextField">Organizer Email</label>
                <input
                    id="organizerEmailTextField"
                    name="organizerEmail"
                    type="email"
                    className="form-control"
                    placeholder="Enter the Organizer Email"
                    value={event.organizerEmail || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            &nbsp;
            <button className="btn btn-primary" type="submit">
                <i className="fas fa-edit"></i> Submit
            </button>
            &nbsp;
            <button className="btn btn-warning" type="button" onClick={() => navigate(-1)} >
                <i className="fas fa-undo"></i>
                Cancel
            </button>
        </form>
    );
};

export default EventForm;