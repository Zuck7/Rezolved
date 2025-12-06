import React from "react";
import { useNavigate } from 'react-router-dom';

const TicketForm = ({ ticket = {}, handleChange, handleSubmit, disabled = false }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="form card p-3">
            <input type="hidden" name="id" value={ticket.id || ""} />

            <div className="form-group">
                <label htmlFor="nameTextField">Customer Name</label>
                <input
                    id="nameTextField"
                    name="name"
                    className="form-control"
                    placeholder="Enter the customer name"
                    value={ticket.name || ""}
                    onChange={handleChange}
                    disabled={disabled}
                    required
                />
            </div>

            <br />
            <div className="form-group">
                <label htmlFor="emailTextField">Customer Email</label>
                <input
                    id="emailTextField"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter customer email"
                    value={ticket.email || ""}
                    onChange={handleChange}
                    disabled={disabled}
                    required
                />
            </div>

            <br />
            <div className="form-group">
                <label htmlFor="prioritySelect">Priority</label>
                <select
                    id="prioritySelect"
                    name="priority"
                    className="form-control"
                    value={ticket.priority || ""}
                    onChange={handleChange}
                    disabled={disabled}
                    required
                >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
            </div>

            <br />
            <div className="form-group">
                <label htmlFor="descTextArea">Description</label>
                <textarea
                    id="descTextArea"
                    name="desc"
                    className="form-control"
                    placeholder="Enter your ticket description here"
                    value={ticket.desc || ""}
                    onChange={handleChange}
                    disabled={disabled}
                    rows="4"
                    required
                />
            </div>

            <br />
            <button className="btn btn-primary" type="submit" disabled={disabled}>
                <i className="fas fa-edit"></i> Submit
            </button>
            &nbsp;
            <button
                className="btn btn-warning"
                type="button"
                onClick={() => navigate('/tickets')}
            >
                <i className="fas fa-undo"></i> Cancel
            </button>
        </form>
    );
};

export default TicketForm;