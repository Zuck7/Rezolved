import React, { useEffect, useState } from 'react';
import { list } from '../../datasource/api-tickets';
import ListTicketItem from './ListTicketItem';
import { Link } from 'react-router-dom';

const ListTickets = () => {
    const [ticketList, setTicketList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadTicket = () => {
        list().then((data) => {
            console.log('API Response:', data);
            if (data) {
                // Handle different response formats
                if (Array.isArray(data)) {
                    setTicketList(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setTicketList(data.data);
                } else if (data.tickets && Array.isArray(data.tickets)) {
                    setTicketList(data.tickets);
                } else {
                    setTicketList([]);
                }
                setIsLoading(false);
            }
        }).catch(err => {
            console.error('Error loading tickets:', err);
            setTicketList([]);
            setIsLoading(false);
            alert(err.message || 'Failed to load tickets');
        });
    }

    // When the component loads.
    useEffect(() => {
        loadTicket();
    }, []);

    // When a item is removed.
    const handleRemove = () => {
        loadTicket();
    }

    return (
        <>
            <div className="container" style={{ paddingTop: 10 }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Ticket List</h2>
                    <Link to="/tickets/add" className="btn btn-primary" role="button">
                        <i className="fas fa-plus-circle"></i> Create a Ticket
                    </Link>
                </div>
                <div className="table-responsive">
                    {isLoading && <div className="alert alert-info">Loading tickets...</div>}
                    {!isLoading && ticketList.length === 0 && (
                        <div className="alert alert-warning">No tickets found. Create your first ticket!</div>
                    )}
                    {!isLoading && ticketList.length > 0 &&
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Priority</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-center" colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketList.map(ticket =>
                                    <ListTicketItem
                                        key={ticket._id || ticket.id}
                                        ticket={ticket}
                                        onRemoved={handleRemove}
                                    />
                                )}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default ListTickets;