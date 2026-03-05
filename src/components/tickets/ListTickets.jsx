import React, { useEffect, useState } from 'react';
import { list } from '../../datasource/api-tickets';
import ListTicketItem from './ListTicketItem';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth-helper';

const ListTickets = () => {
    const [ticketList, setTicketList] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [showClosed, setShowClosed] = useState(false);
    let [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const loadTicket = () => {
        list().then((data) => {
            console.log('API Response:', data);
            if (data) {
                let tickets = [];
                // Handle different response formats
                if (Array.isArray(data)) {
                    tickets = data;
                } else if (data.data && Array.isArray(data.data)) {
                    tickets = data.data;
                } else if (data.tickets && Array.isArray(data.tickets)) {
                    tickets = data.tickets;
                } else {
                    tickets = [];
                }
                setTicketList(tickets);
                filterTickets(tickets, showClosed);
                setIsLoading(false);
            }
        }).catch(err => {
            console.error('Error loading tickets:', err);
            setTicketList([]);
            setFilteredTickets([]);
            setIsLoading(false);
            alert(err.message || 'Failed to load tickets');
        });
    }

    const filterTickets = (tickets, includeClosed) => {
        let filtered = tickets;
        if (!includeClosed) {
            filtered = tickets.filter(ticket =>
                ticket.status !== 'CLOSED' && ticket.status !== 'CANCELLED'
            );
        }
        setFilteredTickets(filtered);
    };

    const handleToggleClosed = () => {
        const newShowClosed = !showClosed;
        setShowClosed(newShowClosed);
        filterTickets(ticketList, newShowClosed);
    };

    // When the component loads.
    useEffect(() => {
        const auth = isAuthenticated();
        if (auth) {
            setCurrentUser(auth.user);
        }
        loadTicket();
    }, []);

    useEffect(() => {
        filterTickets(ticketList, showClosed);
    }, [ticketList, showClosed]);

    // When a item is removed.
    const handleRemove = () => {
        loadTicket();
    }

    return (
        <>
            <div className="hd-inner-page">
                <div className="hd-inner-content">
                <div className="hd-page-header">
                    <div>
                        <h2 className="hd-page-title">Rezolved Dashboard</h2>
                        <p className="hd-page-sub">Manage and track your support tickets</p>
                    </div>
                    <div>
                        <button
                            className={`btn ${showClosed ? 'btn-warning' : 'btn-outline-secondary'} me-2`}
                            onClick={handleToggleClosed}
                        >
                            <i className="fas fa-eye"></i>
                            {showClosed ? 'Hide Closed Tickets' : 'Show All Tickets'}
                        </button>
                        <Link to="/tickets/add" className="btn btn-primary" role="button">
                            <i className="fas fa-plus-circle"></i> Create New Ticket
                        </Link>
                    </div>
                </div>
                <div className="table-responsive">
                    {isLoading && <div className="alert alert-info">Loading tickets...</div>}
                    {!isLoading && filteredTickets.length === 0 && (
                        <div className="alert alert-warning">
                            {showClosed ? 'No tickets found.' : 'No open tickets found.'}
                            {!showClosed && ' Create your first ticket!'}
                        </div>
                    )}
                    {!isLoading && filteredTickets.length > 0 &&
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Ticket #</th>
                                    <th className="text-center">Customer</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-center">Priority</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Created</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTickets.map(ticket =>
                                    <ListTicketItem
                                        key={ticket._id || ticket.id}
                                        ticket={ticket}
                                        onRemoved={handleRemove}
                                        currentUser={currentUser}
                                    />
                                )}
                            </tbody>
                        </table>}
                </div>
                </div>
            </div>
        </>
    )
}

export default ListTickets;