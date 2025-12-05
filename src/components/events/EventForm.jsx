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
                    name="event"
                    className="form-control"
                    placeholder="Enter the Event Name"
                    value={event.name || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="dateTextField">Date</label>
                <input
                    id="dateTextField"
                    name="date"
                    className="form-control"
                    placeholder="Enter the Event Date"
                    value={event.date || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="timeTextField">Time</label>
                <input
                    id="timeTextField"
                    name="time"
                    className="form-control"
                    placeholder="Enter the Event Time"
                    value={event.time || ""}
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
                <label htmlFor="descriptionTextField">Description</label>
                <input
                    id="descriptionTextField"
                    name="description"
                    className="form-control"
                    placeholder="Enter the Event Description"
                    value={event.description || ""}
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