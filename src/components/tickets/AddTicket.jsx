import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketModel from "../../datasource/TicketModel";
import { create } from "../../datasource/api-tickets";
import { isAuthenticated } from "../auth/auth-helper";
import TicketForm from "./TicketForm";

const AddTicket = () => {
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(new TicketModel());
    const [errorMsg, setErrorMsg] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

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


    useEffect(() => {
        const auth = isAuthenticated();
        if (auth) {
            setCurrentUser(auth.user);
            // Pre-populate customer info if user is not admin
            if (auth.user && !auth.user.isAdmin?.()) {
                const fullName = auth.user.getFullName?.() || auth.user.email;
                const email = auth.user.email;

                setTicket(prev => new TicketModel({
                    ...prev,
                    name: fullName,
                    email: email
                }));
            }
        }
    }, []);

    return (
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-2 col-md-8">
                    <h1>Create New Support Ticket</h1>
                    <p className="text-muted">Please provide details about your issue or request</p>
                    {errorMsg && (
                        <div className="alert alert-danger" role="alert">
                            {errorMsg}
                        </div>
                    )}
                    <TicketForm
                        ticket={ticket}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddTicket;