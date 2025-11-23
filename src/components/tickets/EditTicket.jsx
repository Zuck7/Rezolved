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
            if (data) {
                setTicket(new TicketModel(
                    data.id,
                    data.name,
                    data.priority,
                    data.desc,
                    data.user
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

        update(submitTicket, id)
            .then(data => {
                if (data && data.success) {
                    alert(data.message);
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
                    <h1>Edit Ticket Item</h1>
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

export default EditTicket;