import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TicketModel from "../../datasource/TicketModel";
import { update, read } from "../../datasource/api-tickets";
import TicketForm from "./TicketForm";

const EditTicket = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ticket, setTicket] = useState(new TicketModel());
    const [errorMsg, setErrorMsg] = useState('')

    // When the component loads.
    useEffect(() => {
        read(id).then(data => {
            console.log('Read response:', data);
            if (data && data.success !== false && !data.message) {
                // Check if ticket is cancelled or closed
                if (data.status === 'CANCELLED' || data.status === 'CLOSED') {
                    setErrorMsg(`This ticket has been ${data.status}. It cannot be edited.`);
                }

                setTicket({
                    id: data._id || data.id,
                    name: data.customerName,
                    email: data.customerEmail,
                    priority: data.priority,
                    desc: data.description,
                    user: data.createdBy,
                    status: data.status
                });
            } else {
                setErrorMsg(data?.message || 'Failed to load ticket');
            }

        }).catch(err => {
            setErrorMsg(err?.message || 'An error occurred');
            console.error('Read error:', err);
        });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTicket(formData => ({ ...formData, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        // Prevent editing cancelled or closed tickets
        if (ticket.status === 'CANCELLED' || ticket.status === 'CLOSED') {
            alert(`Cannot edit a ${ticket.status} ticket.`);
            return;
        }

        console.log("Updating ticket: ", ticket);

        const submitTicket = {
            priority: ticket.priority,
            description: ticket.desc
        };

        update(submitTicket, id)
            .then(data => {
                if (data && data.success) {
                    alert(data.message || 'Ticket updated successfully');
                    navigate("/tickets");
                } else {
                    setErrorMsg(data?.message || 'Failed to update ticket');
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
                    <h1>Edit Ticket Item</h1>
                    {ticket.status === 'CANCELLED' || ticket.status === 'CLOSED' ? (
                        <div className="alert alert-warning">
                            <i className="fas fa-exclamation-triangle"></i> This ticket has been {ticket.status}. It cannot be edited.
                        </div>
                    ) : null}
                    <p className="flash"><span>{errorMsg}</span></p>
                    <TicketForm
                        ticket={ticket}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        disabled={ticket.status === 'CANCELLED' || ticket.status === 'CLOSED'}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditTicket;