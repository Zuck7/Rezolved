import React from "react";
import { useNavigate } from 'react-router-dom';

// ... imports

const TicketForm = ({ ticket = {}, handleChange, handleSubmit }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="form card p-3">
            <input type="hidden" name="id" value={ticket.id || ""} />

            <div className="form-group">
                <label htmlFor="itemTextField">Ticket Name</label>
                {/* FIX 1: Change name="item" to name="name" */}
                <input
                    id="itemTextField"
                    name="name" 
                    className="form-control"
                    placeholder="Enter the Ticket Name"
                    value={ticket.name || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            
            {/* ... Priority section stays the same ... */}

            <br />
            <div className="form-group">
                <label htmlFor="tagTextArea">Description</label>
                {/* FIX 2: Change name="tags" to name="desc" */}
                <textarea
                    id="tagTextArea"
                    name="desc"
                    className="form-control"
                    placeholder="Enter your ticket description here"
                    value={ticket.desc || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* ... Buttons stay the same ... */}
        </form>
    );
};
export default TicketForm;