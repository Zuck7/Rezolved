import React from "react";
import { useNavigate } from 'react-router-dom';

const TicketForm = ({ ticket = {}, handleChange, handleSubmit }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="form card p-3">
            <input type="hidden" name="id" value={ticket.id || ""} />

            <div className="form-group">
                <label htmlFor="itemTextField">Ticket Name</label>
                <input
                    id="itemTextField"
                    name="item"
                    className="form-control"
                    placeholder="Enter the Item Name"
                    value={ticket.name || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="statusTextField">Priority</label>
                <br />
                <label><input type="radio" name="priority" value="low" required/> Low</label>
                &nbsp;&nbsp;&nbsp;
                <label><input type="radio" name="priority" value="medium" /> Medium</label>
                &nbsp;&nbsp;&nbsp;
                <label><input type="radio" name="priority" value="high" /> High</label>
                &nbsp;&nbsp;&nbsp;
                <label><input type="radio" name="priority" value="urgent" /> Urgent</label>
            
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="tagTextArea">
                    Description
                </label>
                <textarea
                    id="tagTextArea"
                    name="tags"
                    className="form-control"
                    placeholder="Enter your ticket description here"
                    value={ticket.desc || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            &nbsp;
            <button className="btn btn-primary" type="submit">
                <i className="fas fa-edit"></i> Submit Ticket
            </button>
            &nbsp;
            <button className="btn btn-warning" type="button" onClick={() => navigate(-1)} >
                <i className="fas fa-undo"></i>
                Cancel
            </button>
        </form>
    );
};

export default TicketForm;