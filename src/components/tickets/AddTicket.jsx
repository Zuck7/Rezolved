import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketModel from "../../datasource/TicketModel";
import { create } from "../../datasource/api-tickets";
import TicketForm from "./TicketForm";

const AddTicket = () => {
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(new TicketModel());
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTicket(formData => ({ ...formData, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send ticket data matching backend expectations
        const submitTicket = {
            customerName: ticket.name,
            customerEmail: ticket.email,
            priority: ticket.priority,
            description: ticket.desc
        };

        console.log("Sending ticket:", submitTicket);

        create(submitTicket)
            .then(data => {
                console.log('Create response:', data);
                // Backend returns the created ticket object with _id
                if (data && (data._id || data.ticketNumber)) {
                    alert(`Ticket created successfully! Ticket #${data.ticketNumber || data._id}`);
                    navigate("/tickets");
                } else {
                    setErrorMsg(data?.message || 'Failed to create ticket');
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
                    <h1>Add Ticket Item</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <TicketForm
                        ticket={ticket}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddTicket;