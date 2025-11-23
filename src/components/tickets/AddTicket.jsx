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
        console.log("Submitting ticket: ", ticket);

        const submitTicket = {
            id: ticket.id,
            name: ticket.name,
            priority: ticket.priority,
            desc: ticket.desc,
            user: ticket.user
        };

        create(submitTicket)
            .then(data => {
                if (data && data.id) {
                    alert(`Item added with the id ${data.id}`);
                    navigate("/ticket/list");
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